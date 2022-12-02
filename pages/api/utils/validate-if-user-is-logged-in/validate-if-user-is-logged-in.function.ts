import { supabaseInstance } from '@infrastructure';
import { NextApiRequest, NextApiResponse } from 'next';

export const validateIfUserIsLoggedIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await supabaseInstance.auth.api.getUserByCookie(req);

  if (!user) {
    res.status(401).json({ message: 'Unauthorized user' });

    return false;
  }

  return true;
};
