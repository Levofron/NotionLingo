import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import memoryCache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';

import { cleanUpString } from '@infrastructure/utils';

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

import { getWordDetailsFromCambridgeDictionary } from '../cambridge-dictionary/find';

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

interface IMeaningWithExamples {
  examples: string[];
  meaning: string;
}

interface IScrapingWordApiResponse {
  additionalExamples: string[];
  meaningAndExamples: IMeaningWithExamples[];
  word: string;
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

const getMeaningAndExampleSentenceSuggestion = ({
  additionalExamples,
  meaningAndExamples,
  word,
}: IScrapingWordApiResponse) => {
  if (!meaningAndExamples?.length) {
    return null;
  }

  const foundMeaningAndExample = meaningAndExamples.find((_meaningAndExample) => {
    const parsedMeaning = cleanUpString(_meaningAndExample.meaning);
    const hasExampels = _meaningAndExample.examples.length > 0;

    return !!parsedMeaning && hasExampels;
  });

  if (foundMeaningAndExample) {
    return {
      word,
      meaning: foundMeaningAndExample.meaning,
      example: foundMeaningAndExample.examples[0],
    };
  }

  if (additionalExamples.length === 0) {
    return null;
  }

  const foundMeaningWithoutExamples = meaningAndExamples.find((_meaningAndExample) => {
    const parsedMeaning = cleanUpString(_meaningAndExample.meaning);

    return !!parsedMeaning;
  });

  if (foundMeaningWithoutExamples) {
    return {
      word,
      example: additionalExamples[0],
      meaning: foundMeaningWithoutExamples.meaning,
    };
  }

  return null;
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
          const response = await getWordDetailsFromCambridgeDictionary(word as string);

          const meaningAndExampleSentenceSuggestion =
            getMeaningAndExampleSentenceSuggestion(response);

          return {
            id,
            ipa,
            type,
            word,
            meaning,
            exampleSentence,
            meaningSuggestion: meaningAndExampleSentenceSuggestion?.meaning,
            exampleSentenceSuggestion: meaningAndExampleSentenceSuggestion?.example,
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
