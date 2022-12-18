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
  getSession: () => TSession | null;
  getUser: () => TUser | null;
  logout: () => Promise<ILogoutResponse>;
  onAuthStateChange: (callback: TOnAuthStateChangeCallback) => IOnAuthStateChangeResponse;
  signIn: (provider: TProvider) => Promise<IOAuthResponse>;
}
