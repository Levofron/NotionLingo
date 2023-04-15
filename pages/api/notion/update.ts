import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import memoryCache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';

import { cleanUpString } from '@shared/functions';
import { hasOwnProperty } from '@shared/guards';

import { HttpStatusCode } from '@server/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  getNotionApiKeyFromProfile,
  getNotionTableColumns,
  getProfileDataWithNotionDataCheck,
  getTextFromPagePropertyInstance,
  getUserFromRequest,
  validatRoutesecretMiddleware,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  withMiddleware,
} from '@server/utils';

import { generateMemoryCacheKey } from '../../../server/utils/generate-memory-cache-key/generate-memory-cache-key.function';

export const getTitleOrRichTextProperty = (columnName: string, type: string, newValue: string) => {
  if (!newValue) {
    return null;
  }

  return {
    [columnName]: {
      [type]: [
        {
          text: {
            content: newValue,
          },
        },
      ],
    },
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);
  const profileData = await getProfileDataWithNotionDataCheck(user?.id!);

  const { exampleSentence, id, meaning } = req.body;

  const parsedMeaning = cleanUpString(meaning);
  const parsedExampleSentence = cleanUpString(exampleSentence);

  if (!parsedMeaning && !parsedExampleSentence) {
    throw new ApiError(
      HttpStatusCode.BAD_REQUEST,
      'You need to provide at least one of the following parameters: meaning, exampleSentence',
    );
  }

  const notionApiKey = getNotionApiKeyFromProfile(profileData);
  const notionClient = createNotionClient(notionApiKey);

  await notionClient.pages.retrieve({
    page_id: id,
  });

  const tableColumns = await getNotionTableColumns(notionApiKey, profileData.notion_database_id);

  const meaningColumn = tableColumns.find((tableColumn) => tableColumn?.isMeaning);
  const exampleSentenceColumn = tableColumns.find((tableColumn) => tableColumn?.isExampleSentence);

  if (!meaningColumn || !exampleSentenceColumn) {
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      'You need to have at least one of the following columns: meaning, exampleSentence',
    );
  }

  const meaningColumnEdit = getTitleOrRichTextProperty(
    meaningColumn.columnName,
    meaningColumn.type,
    parsedMeaning,
  );

  const exampleSentenceColumnEdit = getTitleOrRichTextProperty(
    exampleSentenceColumn.columnName,
    exampleSentenceColumn.type,
    parsedExampleSentence,
  );

  const result = await notionClient.pages.update({
    page_id: id,
    // @ts-expect-error
    properties: {
      ...meaningColumnEdit,
      ...exampleSentenceColumnEdit,
    },
  });

  if (!hasOwnProperty(result, 'properties')) {
    throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }

  const properties = result?.properties as PageObjectResponse['properties'];
  const getTextFromPageProperty = getTextFromPagePropertyInstance(properties);

  const meaningText = getTextFromPageProperty([meaningColumn.columnName]);
  const exampleSentenceText = getTextFromPageProperty([exampleSentenceColumn.columnName]);
  const cacheKey = generateMemoryCacheKey(user!.id, profileData.notion_database_id, notionApiKey);

  memoryCache.del(cacheKey);

  return res.status(HttpStatusCode.OK).json({
    id: result.id,
    properties: {
      meaning: meaningText,
      exampleSentence: exampleSentenceText,
    },
  });
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validatRoutesecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateIfParametersExistsMiddleware('body', ['id']),
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
