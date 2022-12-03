import { NextApiRequest, NextApiResponse } from 'next';

import {
  withMiddleware,
  getUserFromRequest,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedIn,
  assignRequestTokenToSupabaseSessionMiddleware,
} from '../utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  res.status(200).json(user);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedIn,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
