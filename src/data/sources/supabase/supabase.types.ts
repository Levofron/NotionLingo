import {
  TOAuthResponse,
  ILogoutResponse,
  TUserResponse,
  TSessionResponse,
} from '@domain/supabase/supabase.types';

export interface ISupabaseSource {
  getSession: () => Promise<TSessionResponse>;
  getUser: () => Promise<TUserResponse>;
  loginViaGoogle: () => Promise<TOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
