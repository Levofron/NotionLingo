import { NextApiRequest, NextApiResponse } from 'next';

import { getUserFromRequest } from '../get-user-from-request/get-user-from-request.function';

export const validateIfUserIsLoggedInMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const user = await getUserFromRequest(req);

  if (!user) {
    res.status(401).json({ message: 'Unauthorized user' });

    return false;
  }

  return true;
};
