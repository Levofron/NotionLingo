import { TOAuthResponse, ILogoutResponse } from '@domain/supabase/supabase.types';

export interface ISupabaseSource {
  loginViaGoogle: () => Promise<TOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
