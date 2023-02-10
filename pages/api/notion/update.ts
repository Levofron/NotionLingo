import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import { cleanUpString } from '@infrastructure/utils';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  decrypt,
  getUserFromRequest,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

import { getProfileDataWithNotionDataCheck, getTableColumns } from './table-columns';

const generateColumnEditObject = (columnName: string, type: string, newValue: string) => {
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
      EHttpStatusCode.BAD_REQUEST,
      'You need to provide at least one of the following parameters: meaning, exampleSentence',
    );
  }

  const hash = JSON.parse(profileData?.notion_api_key);
  const notionApiKey = decrypt(hash);

  const notionClient = createNotionClient(notionApiKey);

  await notionClient.pages.retrieve({
    page_id: id,
  });

  const tableColumns = await getTableColumns(notionApiKey, profileData.notion_page_id);

  const meaningColumn = tableColumns.find((tableColumn) => tableColumn?.isMeaning);
  const exampleSentenceColumn = tableColumns.find((tableColumn) => tableColumn?.isExampleSentence);

  if (!meaningColumn || !exampleSentenceColumn) {
    throw new ApiError(
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      'You need to have at least one of the following columns: meaning, exampleSentence',
    );
  }

  const meaningColumnEdit = generateColumnEditObject(
    meaningColumn.columnName,
    meaningColumn.type,
    parsedMeaning,
  );

  const exampleSentenceColumnEdit = generateColumnEditObject(
    exampleSentenceColumn.columnName,
    exampleSentenceColumn.type,
    parsedExampleSentence,
  );

  await notionClient.pages.update({
    page_id: id,
    // @ts-expect-error
    properties: {
      ...meaningColumnEdit,
      ...exampleSentenceColumnEdit,
    },
  });

  return res.status(EHttpStatusCode.OK).json({ meaningColumn, exampleSentenceColumn });
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateIfParametersExistsMiddleware('body', ['id']),
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
