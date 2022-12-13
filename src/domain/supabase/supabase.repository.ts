import {
  ILogoutResponse,
  IOAuthResponse,
  IOnAuthStateChangeResponse,
  TOnAuthStateChangeCallback,
  TSession,
  TUser,
} from './supabase.types';

export interface ISupabaseRepository {
  getSession: () => Promise<TSession | null>;
  getUser: () => Promise<TUser | null>;
  loginViaGoogle: () => Promise<IOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
  onAuthStateChange: (callback: TOnAuthStateChangeCallback) => Promise<IOnAuthStateChangeResponse>;
}
