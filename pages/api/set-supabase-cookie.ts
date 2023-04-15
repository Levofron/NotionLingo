import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';

import {
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import { supabaseInstance } from '@config/supabase.instance';

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  supabaseInstance.auth.api.setAuthCookie(req, res);

const middlewareToApply = [validateRequestMethodMiddleware('POST'), validateRouteSecretMiddleware];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
