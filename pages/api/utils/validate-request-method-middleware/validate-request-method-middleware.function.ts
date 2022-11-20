import { NextApiRequest, NextApiResponse } from 'next';

export const validateRequestMethodMiddleware =
  (expectedValue: string) => (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== expectedValue) {
      res.status(405).send({ message: `Only ${expectedValue} requests allowed` });

      return false;
    }

    return true;
  };
