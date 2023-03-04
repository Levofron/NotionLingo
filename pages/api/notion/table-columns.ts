import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import { isObject, objectKeys } from '@infrastructure/utils';

import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  decrypt,
  getUserFromRequest,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import {
  SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES,
  SUPPORTED_MEANING_COLUMN_NAMES,
  SUPPORTED_WORD_COLUMN_NAMES,
} from '@constants';

import { getProfileById } from '../profile/get';

export const getProfileDataWithNotionDataCheck = async (userId: string) => {
  const profileData = await getProfileById(userId);

  if (!profileData.notion_api_key) {
    throw new ApiError(
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have a notion api key',
    );
  }

  if (!profileData.notion_database_id) {
    throw new ApiError(
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have a selected notion database id',
    );
  }

  return profileData;
};

export const getAvailableDatabases = async (notionApiKey: string) => {
  const notionClient = createNotionClient(notionApiKey);

  const { results: availableDatabases = [] } = await notionClient.search({
    filter: { value: 'database', property: 'object' },
  });

  return availableDatabases as DatabaseObjectResponse[];
};

const getPosition = (isWord: boolean, isMeaning: boolean) => {
  if (isWord) {
    return 1;
  }

  return isMeaning ? 2 : 3;
};

const parsePropertiesToResponse = (properties: DatabaseObjectResponse['properties']) => {
  const parsedProperties = objectKeys(properties).map((_key) => {
    const property = properties[_key];

    if (!isObject(property) || Array.isArray(property)) {
      return null;
    }

    if (property.type === 'multi_select') {
      return {
        position: 4,
        columnName: _key,
        type: property.type,
        options: property.multi_select.options.map((_option) => _option.name),
      };
    }

    const isWord = SUPPORTED_WORD_COLUMN_NAMES.includes(_key);
    const isMeaning = SUPPORTED_MEANING_COLUMN_NAMES.includes(_key);
    const isExampleSentence = SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES.includes(_key);

    if (!isWord && !isMeaning && !isExampleSentence) {
      return null;
    }

    return {
      isWord,
      isMeaning,
      columnName: _key,
      isExampleSentence,
      type: property.type,
      position: getPosition(isWord, isMeaning),
    };
  });

  return parsedProperties.filter(Boolean).sort((a, b) => a!.position - b!.position);
};

export const getTableColumns = async (notionApiKey: string, notionDatabaseId: string) => {
  const availableDatabases = await getAvailableDatabases(notionApiKey);

  const foundDatabase = availableDatabases.find(
    (_database) => _database.id === notionDatabaseId,
  ) as DatabaseObjectResponse;

  if (!foundDatabase) {
    throw new ApiError(
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have any available pages',
    );
  }

  return parsePropertiesToResponse(foundDatabase.properties);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);
  const profileData = await getProfileDataWithNotionDataCheck(user?.id!);

  const hash = JSON.parse(profileData?.notion_api_key);
  const notionApiKey = decrypt(hash);

  const tableColumns = await getTableColumns(notionApiKey, profileData.notion_database_id);

  return res.status(200).json(tableColumns);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
