import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { EHttpStatusCode } from '@server/types/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  getUserFromRequest,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import { getProfileAndUserMetadataById } from './get';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  throw new ApiError(EHttpStatusCode.INTERNAL_SERVER_ERROR, 'test');
  const profileData = await getProfileAndUserMetadataById(user?.id!);

  res.status(EHttpStatusCode.OK).json(profileData);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
