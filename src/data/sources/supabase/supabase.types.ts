import {
  TOAuthResponse,
  ILogoutResponse,
  TUserResponse,
  TSessionResponse,
} from '@domain/supabase/supabase.types';
import { Provider } from '@supabase/supabase-js';

export interface ISupabaseSource {
  getSession: () => Promise<TSessionResponse>;
  getUser: () => Promise<TUserResponse>;
  loginWithOAuth: (provider: Provider) => Promise<TOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
