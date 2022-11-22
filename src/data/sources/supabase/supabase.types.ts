import { TOAuthResponse, ILogoutResponse, TUserResponse } from '@domain/supabase/supabase.types';
import { Provider } from '@supabase/supabase-js';

export interface ISupabaseSource {
  getUser: () => Promise<TUserResponse>;
  loginWithOAuth: (provider: Provider) => Promise<TOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
