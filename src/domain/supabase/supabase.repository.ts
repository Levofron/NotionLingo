import { TOAuthResponse, ILogoutResponse } from './supabase.types';

export interface ISupabaseRepository {
  loginViaGoogle: () => Promise<TOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
