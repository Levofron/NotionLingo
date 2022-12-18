import {
  ILogoutResponse,
  IOAuthResponse,
  IOnAuthStateChangeResponse,
  TOnAuthStateChangeCallback,
  TSession,
  TUser,
} from './supabase.types';

export interface ISupabaseRepository {
  getSession: () => TSession | null;
  getUser: () => TUser | null;
  loginViaGoogle: () => Promise<IOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
  onAuthStateChange: (callback: TOnAuthStateChangeCallback) => IOnAuthStateChangeResponse;
}
