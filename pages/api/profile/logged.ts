import { NextApiResponse } from 'next';
import { AxiomAPIRequest, withAxiom } from 'next-axiom';

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

const handler = async (req: AxiomAPIRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  req.log.info(`User ${user?.id} is requesting his profile data`);
  const profileData = await getProfileAndUserMetadataById(user?.id!, req);

  res.status(EHttpStatusCode.OK).json(profileData);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
