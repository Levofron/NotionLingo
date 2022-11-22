import { NextApiRequest, NextApiResponse } from 'next';

import {
  withMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
} from '../utils';

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  // TODO - add login validation
  // TODO - create get logged profile endpoint

  res.status(200).json({ name: 'John Doe' });
};

const middlewareToApply = [validateRequestMethodMiddleware('GET'), validateRouteSecretMiddleware];

export default withMiddleware(handler)(middlewareToApply);
