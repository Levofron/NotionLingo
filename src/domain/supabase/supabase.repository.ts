import { IOAuthResponse, ILogoutResponse, TUser, TSession } from './supabase.types';

export interface ISupabaseRepository {
  getSession: () => Promise<TSession | null>;
  getUser: () => Promise<TUser | null>;
  loginViaGoogle: () => Promise<IOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
