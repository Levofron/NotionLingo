import { supabaseInstance } from '@infrastructure';
import { NextApiRequest } from 'next';

export const getUserFromRequest = async (req: NextApiRequest) => {
  const { user } = await supabaseInstance.auth.api.getUserByCookie(req);

  return user;
};
