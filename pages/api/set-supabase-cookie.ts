import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure';

import {
  withMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
} from './utils';

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  supabaseInstance.auth.api.setAuthCookie(req, res);

const middlewareToApply = [validateRequestMethodMiddleware('POST'), validateRouteSecretMiddleware];

export default withMiddleware(handler)(middlewareToApply);
