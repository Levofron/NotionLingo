import { IOAuthResponse, ILogoutResponse, TUser, TSession } from '@domain/supabase/supabase.types';

export interface ISupabaseSource {
  getSession: () => Promise<TSession | null>;
  getUser: () => Promise<TUser | null>;
  loginViaGoogle: () => Promise<IOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
