import {
  ILogoutResponse,
  IOAuthResponse,
  IOnAuthStateChangeResponse,
  TOnAuthStateChangeCallback,
  TProvider,
  TSession,
  TUser,
} from '@domain/supabase/supabase.types';

export interface ISupabaseSource {
  getSession: () => Promise<TSession | null>;
  getUser: () => Promise<TUser | null>;
  logout: () => Promise<ILogoutResponse>;
  onAuthStateChange: (callback: TOnAuthStateChangeCallback) => Promise<IOnAuthStateChangeResponse>;
  signIn: (provider: TProvider) => Promise<IOAuthResponse>;
}
