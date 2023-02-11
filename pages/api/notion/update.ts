import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import { cleanUpString, hasOwnProperty } from '@infrastructure/utils';
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

export const getTextFromPagePropertyInstance =
  (pageProperties: PageObjectResponse['properties']) => (propertyNames: string | string[]) => {
    const parsedPropertyNames = Array.isArray(propertyNames) ? propertyNames : [propertyNames];

    let selectedPageProperties = pageProperties[parsedPropertyNames[0]];

    if (!selectedPageProperties) {
      for (const _propertyName of parsedPropertyNames) {
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

  const tableColumns = await getTableColumns(notionApiKey, profileData.notion_database_id);

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

  const result = await notionClient.pages.update({
    page_id: id,
    // @ts-expect-error
    properties: {
      ...meaningColumnEdit,
      ...exampleSentenceColumnEdit,
    },
  });

  if (!hasOwnProperty(result, 'properties')) {
    throw new ApiError(EHttpStatusCode.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }

  const properties = result?.properties as PageObjectResponse['properties'];
  const getTextFromPageProperty = getTextFromPagePropertyInstance(properties);

  const meaningText = getTextFromPageProperty([meaningColumn.columnName]);
  const exampleSentenceText = getTextFromPageProperty([exampleSentenceColumn.columnName]);

  return res.status(EHttpStatusCode.OK).json({
    id: result.id,
    meaning: meaningText,
    exampleSentence: exampleSentenceText,
  });
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateIfParametersExistsMiddleware('body', ['id']),
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
