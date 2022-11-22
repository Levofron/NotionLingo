import { TOAuthResponse, ILogoutResponse, TUserResponse } from './supabase.types';

export interface ISupabaseRepository {
  getUser: () => Promise<TUserResponse>;
  loginViaGoogle: () => Promise<TOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
