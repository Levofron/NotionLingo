import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { supabaseInstance } from '@infrastructure/config';
import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  encrypt,
  getUserFromRequest,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

import { getAvailableDatabases } from './table-columns';

const updateProfileNotionApiKey = async (userId: string, newNotionApiKey: string) =>
  supabaseInstance
    .from('profiles')
    .update({
      notion_page_id: null,
      notion_api_key: newNotionApiKey,
    })
    .throwOnError()
    .eq('id', userId);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body;

  const user = await getUserFromRequest(req);

  const databases = await getAvailableDatabases(token);

  if (databases.length === 0) {
    throw new ApiError(EHttpStatusCode.INTERNAL_SERVER_ERROR, 'Your words database is empty');
  }

  const hash = encrypt(token);
  const hashAsString = JSON.stringify(hash);

  await updateProfileNotionApiKey(user?.id!, hashAsString);

  return res.status(EHttpStatusCode.OK).json(hash);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateIfParametersExistsMiddleware('body', ['token']),
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
