import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { supabaseInstance } from '@infrastructure/config';
import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import { isObject, objectKeys } from '@infrastructure/utils';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  decrypt,
  getUserFromRequest,
  isValidNotionPageSchema,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

const getProfileDetails = (userId: string) =>
  supabaseInstance
    .from('profiles')
    .select('notion_api_key,notion_page_id')
    .eq('id', userId)
    .throwOnError()
    .single();

const parsePropertiesToResponse = (properties: DatabaseObjectResponse['properties']) => {
  const parsedProperties = objectKeys(properties).map((_key) => {
    const property = properties[_key];

    if (!isObject(property) || Array.isArray(property)) {
      return null;
    }

    if (property.type === 'multi_select') {
      return {
        id: property.id,
        columnName: _key,
        type: property.type,
        options: property.multi_select.options.map((_option) => _option.name),
      };
    }

    return {
      id: property.id,
      columnName: _key,
      type: property.type,
    };
  });

  return parsedProperties;
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

  const { results: availableDatabases } = await notionClient.search({
    filter: { value: 'database', property: 'object' },
  });

  const foundDatabase = availableDatabases.find(
    (_database) => _database.id === profileData.notion_page_id,
  ) as DatabaseObjectResponse;

  if (!foundDatabase) {
    throw new ApiError(
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have any available pages',
    );
  }

  if (!isValidNotionPageSchema(foundDatabase.properties)) {
    throw new ApiError(
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have a valid notion page schema',
    );
  }

  return res.status(200).json(parsePropertiesToResponse(foundDatabase.properties));
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
