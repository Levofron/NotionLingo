import cookie from 'cookie';
import { NextApiRequest } from 'next';

import { supabaseInstance } from '@config/supabase.instance';

import { getUserFromRequest } from '../get-user-from-request/get-user-from-request.function';

export const assignRequestTokenToSupabaseSessionMiddleware = async (req: NextApiRequest) => {
  const user = await getUserFromRequest(req);

  const token = cookie.parse(req.headers.cookie || '')['sb:token'];

  supabaseInstance.auth.session = () => ({
    user,
    token_type: '',
    access_token: token,
  });

  return true;
};
