import { NextApiRequest } from 'next';

import { supabaseInstance } from '@config/supabase.instance';

export const getUserFromRequest = async (req: NextApiRequest) => {
  const { user } = await supabaseInstance.auth.api.getUserByCookie(req);

  return user;
};
