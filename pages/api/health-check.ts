import { NextApiRequest, NextApiResponse } from 'next';

import { withMiddleware, validateRequestMethodMiddleware } from './utils';

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  res.status(200).send(isoDate);
};

const middlewareToApply = [validateRequestMethodMiddleware('GET')];

export default withMiddleware(handler)(middlewareToApply);
