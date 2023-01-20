import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { supabaseInstance } from '@infrastructure/config';
import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
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

const getProfileDetails = (userId: string) =>
  supabaseInstance
    .from('profiles')
    .select('notion_api_key,notion_page_id')
    .eq('id', userId)
    .throwOnError()
    .single();

const updateProfileNotionApiKey = async (userId: string, newNotionPageId: string) =>
  supabaseInstance
    .from('profiles')
    .update({
      notion_page_id: newNotionPageId,
    })
    .throwOnError()
    .eq('id', userId);

const getDatabasePages = async (pageId: string, hashAsString: string) => {
  const hash = JSON.parse(hashAsString);
  const notionApiKey = decrypt(hash);

  const notionClient = createNotionClient(notionApiKey);

  const { results: databasePages } = await notionClient.databases.query({
    database_id: pageId,
  });

  return databasePages;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pageId } = req.body;

  const user = await getUserFromRequest(req);
  const { data: profileData } = await getProfileDetails(user?.id!);

  if (!profileData.notion_api_key) {
    throw new ApiError(
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have a notion api key',
    );
  }

  const databasePages = await getDatabasePages(pageId, profileData.notion_api_key);

  if (databasePages.length === 0) {
    throw new ApiError(EHttpStatusCode.INTERNAL_SERVER_ERROR, 'Your words database is empty');
  }

  await updateProfileNotionApiKey(user?.id!, pageId);

  return res.status(EHttpStatusCode.OK).json(pageId);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateIfParametersExistsMiddleware('body', ['pageId']),
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
