import { Session, User, UserCredentials } from '@supabase/supabase-js';

import {
  ILogoutResponse,
  IOAuthResponse,
  IOnAuthStateChangeResponse,
  TOnAuthStateChangeCallback,
} from '@domain/supabase/supabase.entities';

export interface ISupabaseApi {
  getSession: () => Session | null;
  getUser: () => User | null;
  logout: () => Promise<ILogoutResponse>;
  onAuthStateChange: (callback: TOnAuthStateChangeCallback) => IOnAuthStateChangeResponse;
  signIn: (userCredentials: UserCredentials) => Promise<IOAuthResponse>;
}
