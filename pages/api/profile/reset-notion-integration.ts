import { NextApiRequest, NextApiResponse } from 'next';

import { EHttpStatusCode } from '@infrastructure/types/http-status-code';

import {
  assignRequestTokenToSupabaseSessionMiddleware,
  getUserFromRequest,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import { supabaseInstance } from '@config/supabase/supabase.instance';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  await supabaseInstance
    .from('profiles')
    .update({
      notion_api_key: null,
      notion_database_id: null,
    })
    .eq('id', user?.id)
    .throwOnError()
    .single();

  return res.status(EHttpStatusCode.OK).send('ok');
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
