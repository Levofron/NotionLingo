import { NextApiRequest, NextApiResponse } from 'next';

import { API_ROUTE_SECRET } from '@config/constants';

export const validateRouteSecretMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization !== API_ROUTE_SECRET) {
    res.status(401).json({ message: 'Invalid api route secret' });

    return false;
  }

  return true;
};
