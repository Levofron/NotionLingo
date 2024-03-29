import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';

import { HttpStatusCode } from '@server/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  decrypt,
  getProfileById,
  getUserFromRequest,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import { supabaseInstance } from '@config/supabase.instance';

const updateProfileNotionApiKey = async (userId: string, newNotionDatabaseId: string) =>
  supabaseInstance
    .from('profiles')
    .update({
      notion_database_id: newNotionDatabaseId,
    })
    .throwOnError()
    .eq('id', userId);

const getDatabasePages = async (databaseId: string, hashAsString: string) => {
  const hash = JSON.parse(hashAsString);
  const notionApiKey = decrypt(hash);

  const notionClient = createNotionClient(notionApiKey);

  const { results: databasePages } = await notionClient.databases.query({
    database_id: databaseId,
  });

  return databasePages;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { databaseId } = req.body;

  const user = await getUserFromRequest(req);
  const profileData = await getProfileById(user?.id!);

  if (!profileData.notion_api_key) {
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have a notion api key',
    );
  }

  const databasePages = await getDatabasePages(databaseId, profileData.notion_api_key);

  if (databasePages.length === 0) {
    throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Your words database is empty');
  }

  await updateProfileNotionApiKey(user?.id!, databaseId);

  return res.status(HttpStatusCode.OK).json(databaseId);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateIfParametersExistsMiddleware('body', ['databaseId']),
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
