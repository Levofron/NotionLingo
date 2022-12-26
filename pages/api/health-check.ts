import { NextApiRequest, NextApiResponse } from 'next';

import {
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  res.status(200).json(isoDate);
};

const middlewareToApply = [validateRequestMethodMiddleware('GET'), validateRouteSecretMiddleware];

export default withMiddleware(handler)(middlewareToApply);
