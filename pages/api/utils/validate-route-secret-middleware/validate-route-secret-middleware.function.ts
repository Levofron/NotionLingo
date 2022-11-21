import { NextApiRequest, NextApiResponse } from 'next';

const apiRouteSecret = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;

export const validateRouteSecretMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization !== apiRouteSecret) {
    res.status(401).send({ message: 'Invalid api route secret' });

    return false;
  }

  return true;
};
