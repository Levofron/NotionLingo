import { Session, User, UserCredentials } from '@supabase/supabase-js';

import {
  ILogoutResponse,
  IOAuthResponse,
  IOnAuthStateChangeResponse,
  OnAuthStateChangeCallback,
} from '@domain/supabase/supabase.models';

export interface ISupabaseApi {
  getSession: () => Session | null;
  getUser: () => User | null;
  logout: () => Promise<ILogoutResponse>;
  onAuthStateChange: (callback: OnAuthStateChangeCallback) => IOnAuthStateChangeResponse;
  signIn: (userCredentials: UserCredentials) => Promise<IOAuthResponse>;
}
