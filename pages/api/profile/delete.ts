import { NextApiRequest, NextApiResponse } from 'next';

import { getSupabaseService, supabaseInstance } from '@infrastructure/config';
import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  getUserFromRequest,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  await supabaseInstance
    .from('profiles')
    .update({
      is_deleted: true,
    })
    .throwOnError()
    .eq('id', user?.id);

  const supabaseService = getSupabaseService();

  await supabaseService.auth.api.deleteUser(user?.id!);

  res.status(EHttpStatusCode.OK).json({ userId: user?.id });
};

const middlewareToApply = [
  validateRequestMethodMiddleware('DELETE'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
