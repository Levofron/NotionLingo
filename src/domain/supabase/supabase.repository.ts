import { TOAuthResponse, ILogoutResponse, TUserResponse, TSessionResponse } from './supabase.types';

export interface ISupabaseRepository {
  getSession: () => Promise<TSessionResponse>;
  getUser: () => Promise<TUserResponse>;
  loginViaGoogle: () => Promise<TOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
