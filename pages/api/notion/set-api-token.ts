import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';

import { HttpStatusCode } from '@server/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  encrypt,
  getAvailableNotionDatabases,
  getUserFromRequest,
  validatRoutesecretMiddleware,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  withMiddleware,
} from '@server/utils';

import { supabaseInstance } from '@config/supabase.instance';

const updateProfileNotionApiKey = async (userId: string, newNotionApiKey: string) =>
  supabaseInstance
    .from('profiles')
    .update({
      notion_database_id: null,
      notion_api_key: newNotionApiKey,
    })
    .throwOnError()
    .eq('id', userId);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body;

  const user = await getUserFromRequest(req);
  const availableDatabases = await getAvailableNotionDatabases(token);

  if (!availableDatabases?.length) {
    throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Your words database is empty');
  }

  const hash = encrypt(token);
  const hashAsString = JSON.stringify(hash);

  await updateProfileNotionApiKey(user?.id!, hashAsString);

  return res.status(HttpStatusCode.OK).json(hash);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validatRoutesecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateIfParametersExistsMiddleware('body', ['token']),
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
