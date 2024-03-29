import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';

import { HttpStatusCode } from '@server/http-status-code';
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
  const profileData = await getProfileAndUserMetadataById(user?.id!);

  res.status(HttpStatusCode.OK).json(profileData);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
