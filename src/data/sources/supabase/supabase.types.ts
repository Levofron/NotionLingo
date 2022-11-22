import { TOAuthResponse, ILogoutResponse, TUserResponse } from '@domain/supabase/supabase.types';

export interface ISupabaseSource {
  getUser: () => Promise<TUserResponse>;
  loginViaGoogle: () => Promise<TOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
