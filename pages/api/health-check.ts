import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';

import { HttpStatusCode } from '@server/http-status-code';
import {
  validatRoutesecretMiddleware,
  validateRequestMethodMiddleware,
  withMiddleware,
} from '@server/utils';

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  res.status(HttpStatusCode.OK).json(isoDate);
};

const middlewareToApply = [validateRequestMethodMiddleware('GET'), validatRoutesecretMiddleware];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
