import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';

import {
  validatRoutesecretMiddleware,
  validateRequestMethodMiddleware,
  withMiddleware,
} from '@server/utils';

import { supabaseInstance } from '@config/supabase.instance';

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  supabaseInstance.auth.api.setAuthCookie(req, res);

const middlewareToApply = [validateRequestMethodMiddleware('POST'), validatRoutesecretMiddleware];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
