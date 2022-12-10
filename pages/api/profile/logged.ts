import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure';

import {
  assignRequestTokenToSupabaseSessionMiddleware,
  getUserFromRequest,
  validateIfUserIsLoggedIn,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '../utils';

const getProfileDetails = (userId: string) =>
  supabaseInstance.from('profiles').select('id,email,created_at').eq('id', userId).single();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  const { data: profileData, error: profileError } = await getProfileDetails(user?.id!);

  if (profileError) {
    return res.status(500).json(profileError);
  }

  const userData = {
    id: profileData.id,
    email: profileData.email,
    createdAt: profileData.created_at,
    fullName: user?.user_metadata.full_name,
    avatarUrl: user?.user_metadata.avatar_url,
  };

  res.status(200).json(userData);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedIn,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
