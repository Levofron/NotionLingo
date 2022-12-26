import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import memoryCache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure/config';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  decrypt,
  getRandomNumber,
  getUserFromRequest,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

const PAGE_SIZE = 100;
const RECORDS_TO_RETURN = 5;
const CACHE_TIME = 1000 * 60 * 60;

type TPage = PageObjectResponse | PartialPageObjectResponse;

interface IGetAllPagesParams {
  databaseId: string;
  notionClient: Client;
}

interface IGetAllPagesWithCacheParams extends IGetAllPagesParams {
  notionApiKey: string;
  profileId: string;
}

const getProfileDetails = (userId: string) =>
  supabaseInstance
    .from('profiles')
    .select('notion_api_key,notion_page_id')
    .eq('id', userId)
    .single();

const getAllPages = async ({ databaseId, notionClient }: IGetAllPagesParams) => {
  let result: TPage[] = [];
  let startCursor: string | undefined;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const database = await notionClient.databases.query({
      start_cursor: startCursor,
      database_id: databaseId,
      page_size: PAGE_SIZE,
    });

    startCursor = database.next_cursor || undefined;

    result = [...result, ...database.results];

    if (!database.has_more) {
      break;
    }
  }

  return result;
};

const getRandomFivePages = (pages: TPage[]) => {
  const amountOfRecords = pages.length;

  if (amountOfRecords <= RECORDS_TO_RETURN) {
    return pages;
  }

  let result: TPage[] = [];
  const copiedPages = [...pages];

  for (let i = 0; i < RECORDS_TO_RETURN; i += 1) {
    const max = copiedPages.length;
    const randomIndex = getRandomNumber(0, max);

    const selectedPage = copiedPages[randomIndex];

    result = [...result, selectedPage];

    delete copiedPages[randomIndex];
  }

  return result;
};

const joinRichTextItemResponse = (richTextItemResponse: RichTextItemResponse[]) =>
  richTextItemResponse.map((_richText) => _richText.plain_text).join('');

const getTextFromPageProperty = (pageProperties: PageObjectResponse['properties'], key: string) => {
  const selectedPageProperties = pageProperties[key];

  if (selectedPageProperties.type === 'title') {
    return joinRichTextItemResponse(selectedPageProperties.title);
  }

  if (selectedPageProperties.type === 'rich_text') {
    return joinRichTextItemResponse(selectedPageProperties.rich_text);
  }

  return `Unsupported "${selectedPageProperties.type}" type`;
};

const getAllPagesWithCache = async ({
  databaseId,
  notionApiKey,
  notionClient,
  profileId,
}: IGetAllPagesWithCacheParams) => {
  const cacheKey = `${profileId}-${notionApiKey}-${databaseId}`;
  const cachedPages = memoryCache.get(cacheKey);

  if (cachedPages) {
    return cachedPages;
  }

  const pages = await getAllPages({ notionClient, databaseId });

  memoryCache.put(cacheKey, pages, CACHE_TIME);

  return pages;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  const { data: profileData, error: profileError } = await getProfileDetails(user?.id!);

  if (profileError) {
    return res.status(500).json(profileError);
  }

  if (!profileData.notion_api_key) {
    return res.status(500).json({ message: 'The user does not have a notion api key' });
  }

  if (!profileData.notion_page_id) {
    return res.status(500).json({ message: 'The user does not have a selected notion page id' });
  }

  try {
    const hash = JSON.parse(profileData.notion_api_key);
    const notionApiKey = decrypt(hash);

    const notionClient = createNotionClient(notionApiKey);

    const allPages = await getAllPagesWithCache({
      notionApiKey,
      notionClient,
      profileId: user?.id!,
      databaseId: profileData.notion_page_id,
    });

    const selectedPages = getRandomFivePages(allPages) as PageObjectResponse[];

    const formattedPages = selectedPages.map((_selectedPage) => ({
      word: getTextFromPageProperty(_selectedPage.properties, 'Word'),
      meaning: getTextFromPageProperty(_selectedPage.properties, 'Meaning'),
      exampleSentence: getTextFromPageProperty(_selectedPage.properties, 'Example sentence'),
    }));

    return res.status(200).json(formattedPages);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
