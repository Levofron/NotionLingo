import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';

import { HttpStatusCode } from '@server/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  decrypt,
  getAvailableNotionDatabases,
  getProfileById,
  getUserFromRequest,
  isValidNotionDatabaseSchema,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);
  const profileData = await getProfileById(user?.id!);

  if (!profileData.notion_api_key) {
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have a notion api key',
    );
  }

  const hash = JSON.parse(profileData.notion_api_key);
  const notionApiKey = decrypt(hash);

  const availableDatabases = await getAvailableNotionDatabases(notionApiKey);

  const filteredAvailableDatabases = availableDatabases.filter((_database) =>
    isValidNotionDatabaseSchema(_database.properties),
  );

  const mappedAvailableDatabases = filteredAvailableDatabases.map((_database) => ({
    id: _database.id,
    url: _database.url,
    createdTime: _database.created_time,
    title: _database.title[0].plain_text,
    lastEditedTime: _database.last_edited_time,
  }));

  return res.status(200).json(mappedAvailableDatabases);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
