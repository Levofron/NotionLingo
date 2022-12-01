import cookie from 'cookie';
import { supabaseInstance } from '@infrastructure';
import { NextApiRequest } from 'next';

export const assignRequestTokenToSupabaseSessionMiddleware = async (req: NextApiRequest) => {
  const { user } = await supabaseInstance.auth.api.getUserByCookie(req);

  const token = cookie.parse(req.headers.cookie || '')['sb:token'];

  supabaseInstance.auth.session = () => ({
    user,
    token_type: '',
    access_token: token,
  });

  return true;
};
