import { NextApiRequest, NextApiResponse } from 'next';

import {
  withMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
} from '../utils';

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  // TODO - add login validation
  // TODO - create update profile endpoint
  // TODO - allow user to change only api_key and page_id

  res.status(200).json({ name: 'John Doe' });
};

const middlewareToApply = [validateRequestMethodMiddleware('POST'), validateRouteSecretMiddleware];

export default withMiddleware(handler)(middlewareToApply);
