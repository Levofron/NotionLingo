import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import memoryCache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';

import { EHttpStatusCode } from '@server/types/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  decrypt,
  generateMemoryCacheKey,
  getProfileDataWithNotionDataCheck,
  getRandomNumber,
  getTextFromPagePropertyInstance,
  getUserFromRequest,
  textToIpa,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import {
  SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES,
  SUPPORTED_MEANING_COLUMN_NAMES,
  SUPPORTED_TYPE_COLUMN_NAMES,
  SUPPORTED_WORD_COLUMN_NAMES,
} from '@config/constants';

import { getWordDetailsFromDictionary } from '../dictionary/find';

const PAGE_SIZE = 100;
const RECORDS_TO_RETURN = 5;
const CACHE_TIME = 1000 * 60 * 60;

type TPage = PageObjectResponse | PartialPageObjectResponse;

interface IGetPagesParams {
  notionClient: Client;
  notionDatabaseId: string;
  startCursor: string | null;
}

interface IGetPagesWithCacheParams {
  notionApiKey: string;
  notionClient: Client;
  notionDatabaseId: string;
  profileId: string;
}

interface IGetPagesResult {
  hasMore: boolean;
  nextCursor: string | null;
  pages: TPage[];
}

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
  notionClient,
  notionDatabaseId,
  startCursor,
}: IGetPagesParams): Promise<IGetPagesResult> => {
  const database = await notionClient.databases.query({
    start_cursor: startCursor || undefined,
    database_id: notionDatabaseId,
    page_size: PAGE_SIZE,
  });

  return { pages: database.results, hasMore: database.has_more, nextCursor: database.next_cursor };
};

const getPagesWithCache = async ({
  notionApiKey,
  notionClient,
  notionDatabaseId,
  profileId,
}: IGetPagesWithCacheParams) => {
  const cacheKey = generateMemoryCacheKey(profileId, notionDatabaseId, notionApiKey);
  const cachedGetPagesResult = memoryCache.get(cacheKey) as IGetPagesResult | null;

  if (!cachedGetPagesResult) {
    const result = await getPages({
      notionDatabaseId,
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
    notionDatabaseId,
    notionClient,
    startCursor: nextCursor,
  });

  const allPages = [...cachedPages, ...newPages].filter(Boolean);

  memoryCache.put(cacheKey, { pages: allPages, hasMore, nextCursor: newNextCursor }, CACHE_TIME);

  return allPages;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);
  const profileData = await getProfileDataWithNotionDataCheck(user?.id!);

  const hash = JSON.parse(profileData.notion_api_key);
  const notionApiKey = decrypt(hash);

  const notionClient = createNotionClient(notionApiKey);

  const allPages = await getPagesWithCache({
    notionApiKey,
    notionClient,
    profileId: user?.id!,
    notionDatabaseId: profileData.notion_database_id,
  });

  const selectedPages = getRandomFivePages(allPages) as PageObjectResponse[];

  const formattedPages = await Promise.all(
    selectedPages.map(async (_selectedPage) => {
      const getTextFromPageProperty = getTextFromPagePropertyInstance(_selectedPage.properties);

      const { id } = _selectedPage;
      const word = getTextFromPageProperty(SUPPORTED_WORD_COLUMN_NAMES);
      const type = getTextFromPageProperty(SUPPORTED_TYPE_COLUMN_NAMES);
      const meaning = getTextFromPageProperty(SUPPORTED_MEANING_COLUMN_NAMES);
      const exampleSentence = getTextFromPageProperty(SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES);

      const ipa = textToIpa(word as string);

      if (!meaning || !exampleSentence) {
        try {
          const response = await getWordDetailsFromDictionary(word as string);

          return {
            id,
            ipa,
            type,
            word,
            meaning,
            exampleSentence,
            meaningSuggestion: response?.suggestions[0]?.meaning,
            exampleSentenceSuggestion: response?.suggestions[0]?.example,
          };
        } catch (error) {
          console.error(error);
        }
      }

      return {
        id,
        ipa,
        type,
        word,
        meaning,
        exampleSentence,
      };
    }),
  );

  return res.status(EHttpStatusCode.OK).json(formattedPages);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
