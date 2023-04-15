import { Session, User, UserCredentials } from '@supabase/supabase-js';

import {
  LogoutResponse,
  OAuthResponse,
  OnAuthStateChangeCallback,
  OnAuthStateChangeResponse,
} from '@domain/supabase/supabase.models';

export interface SupabaseApi {
  getSession: () => Session | null;
  getUser: () => User | null;
  logout: () => Promise<LogoutResponse>;
  onAuthStateChange: (callback: OnAuthStateChangeCallback) => OnAuthStateChangeResponse;
  signIn: (userCredentials: UserCredentials) => Promise<OAuthResponse>;
}
