import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import memoryCache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { supabaseInstance } from '@infrastructure/config';
import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  decrypt,
  getRandomNumber,
  getUserFromRequest,
  textToIpa,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

import {
  SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES,
  SUPPORTED_MEANING_COLUMN_NAMES,
  SUPPORTED_TYPE_COLUMN_NAMES,
  SUPPORTED_WORD_COLUMN_NAMES,
} from '@constants';

const PAGE_SIZE = 100;
const RECORDS_TO_RETURN = 5;
const CACHE_TIME = 1000 * 60 * 60;

type TPage = PageObjectResponse | PartialPageObjectResponse;

interface IGetPagesParams {
  databaseId: string;
  notionClient: Client;
  startCursor: string | null;
}

interface IGetPagesWithCacheParams {
  databaseId: string;
  notionApiKey: string;
  notionClient: Client;
  profileId: string;
}

interface IGetPagesResult {
  hasMore: boolean;
  nextCursor: string | null;
  pages: TPage[];
}

const getProfileDetails = (userId: string) =>
  supabaseInstance
    .from('profiles')
    .select('notion_api_key,notion_page_id')
    .eq('id', userId)
    .throwOnError()
    .single();

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

    if (!selectedPage) {
      i -= 1;

      continue;
    }

    result = [...result, selectedPage];

    delete copiedPages[randomIndex];
  }

  return result;
};

const getPages = async ({
  databaseId,
  notionClient,
  startCursor,
}: IGetPagesParams): Promise<IGetPagesResult> => {
  const database = await notionClient.databases.query({
    start_cursor: startCursor || undefined,
    database_id: databaseId,
    page_size: PAGE_SIZE,
  });

  return { pages: database.results, hasMore: database.has_more, nextCursor: database.next_cursor };
};

const getPagesWithCache = async ({
  databaseId,
  notionApiKey,
  notionClient,
  profileId,
}: IGetPagesWithCacheParams) => {
  const cacheKeyObject = {
    profileId,
    databaseId,
    notionApiKey,
  };

  const cacheKey = JSON.stringify(cacheKeyObject);
  const cachedGetPagesResult = memoryCache.get(cacheKey) as IGetPagesResult | null;

  if (!cachedGetPagesResult) {
    const result = await getPages({
      databaseId,
      notionClient,
      startCursor: null,
    });

    const filteredPages = result.pages.filter(Boolean);

    memoryCache.put(cacheKey, { ...result, pages: filteredPages }, CACHE_TIME);

    return result.pages;
  }

  if (cachedGetPagesResult && !cachedGetPagesResult.hasMore) {
    return cachedGetPagesResult.pages;
  }

  const { nextCursor, pages: cachedPages } = cachedGetPagesResult;

  const {
    hasMore,
    nextCursor: newNextCursor,
    pages: newPages,
  } = await getPages({
    databaseId,
    notionClient,
    startCursor: nextCursor,
  });

  const allPages = [...cachedPages, ...newPages].filter(Boolean);

  memoryCache.put(cacheKey, { pages: allPages, hasMore, nextCursor: newNextCursor }, CACHE_TIME);

  return allPages;
};

const getTextFromPageProperty = (
  pageProperties: PageObjectResponse['properties'],
  propertyNames: string[],
) => {
  let selectedPageProperties = pageProperties[propertyNames[0]];

  if (!selectedPageProperties) {
    for (const _propertyName of propertyNames) {
      if (pageProperties[_propertyName]) {
        selectedPageProperties = pageProperties[_propertyName];

        break;
      }
    }
  }

  if (!selectedPageProperties) {
    return null;
  }

  if (selectedPageProperties.type === 'title') {
    return selectedPageProperties.title.map((_title) => _title.plain_text).join('');
  }

  if (selectedPageProperties.type === 'rich_text') {
    return selectedPageProperties.rich_text.map((_richText) => _richText.plain_text).join('');
  }

  if (selectedPageProperties.type === 'multi_select') {
    return selectedPageProperties.multi_select.map((_multiSelect) => _multiSelect.name);
  }

  if (selectedPageProperties.type === 'select') {
    return selectedPageProperties.select?.name || '';
  }

  throw new Error(`Unsupported "${selectedPageProperties.type}" type`);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);
  const { data: profileData } = await getProfileDetails(user?.id!);

  if (!profileData.notion_api_key) {
    throw new ApiError(
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have a notion api key',
    );
  }

  if (!profileData.notion_api_key) {
    throw new ApiError(
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have a selected notion page id',
    );
  }

  const hash = JSON.parse(profileData.notion_api_key);
  const notionApiKey = decrypt(hash);

  const notionClient = createNotionClient(notionApiKey);

  const allPages = await getPagesWithCache({
    notionApiKey,
    notionClient,
    profileId: user?.id!,
    databaseId: profileData.notion_page_id,
  });

  const selectedPages = getRandomFivePages(allPages) as PageObjectResponse[];

  const formattedPages = selectedPages.map((_selectedPage) => {
    const word = getTextFromPageProperty(_selectedPage.properties, SUPPORTED_WORD_COLUMN_NAMES);
    const ipa = textToIpa(word as string);

    return {
      ipa,
      word,
      type: getTextFromPageProperty(_selectedPage.properties, SUPPORTED_TYPE_COLUMN_NAMES),
      meaning: getTextFromPageProperty(_selectedPage.properties, SUPPORTED_MEANING_COLUMN_NAMES),
      exampleSentence: getTextFromPageProperty(
        _selectedPage.properties,
        SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES,
      ),
    };
  });

  return res.status(EHttpStatusCode.OK).json(formattedPages);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
