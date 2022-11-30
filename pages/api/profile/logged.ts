import { NextApiRequest, NextApiResponse } from 'next';

import {
  withMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedIn,
  assignRequestTokenToSupabaseSessionMiddleware,
} from '../utils';

import { supabaseInstance } from '@infrastructure';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await supabaseInstance.auth.api.getUserByCookie(req);

  const { data: profilesData, error: profilesError } = await supabaseInstance
    .from('profiles')
    .select('email,created_at,updated_at')
    .eq('id', user?.id)
    .single();

  if (profilesError) {
    return res.status(500).send(profilesError);
  }

  const mergedUser = { ...user, ...profilesData };

  res.status(200).json(mergedUser);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedIn,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
