import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

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

  const supabaseService = getSupabaseService();

  const { error } = await supabaseService.auth.api.deleteUser(user?.id!);

  if (error) {
    throw new ApiError(EHttpStatusCode.INTERNAL_SERVER_ERROR, error.message);
  }

  await supabaseInstance
    .from('profiles')
    .update({
      is_deleted: true,
    })
    .throwOnError()
    .eq('id', user?.id);

  res.status(EHttpStatusCode.OK).json({ userId: user?.id });
};

const middlewareToApply = [
  validateRequestMethodMiddleware('DELETE'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
