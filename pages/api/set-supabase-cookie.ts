import { NextApiRequest, NextApiResponse } from 'next';

import {
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import { supabaseInstance } from '@config/supabase/supabase.instance';

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  supabaseInstance.auth.api.setAuthCookie(req, res);

const middlewareToApply = [validateRequestMethodMiddleware('POST'), validateRouteSecretMiddleware];

export default withMiddleware(handler)(middlewareToApply);
