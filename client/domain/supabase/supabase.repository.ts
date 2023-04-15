import { Session, User } from '@supabase/supabase-js';

import {
  LogoutResponse,
  OAuthResponse,
  OnAuthStateChangeCallback,
  OnAuthStateChangeResponse,
} from './supabase.models';

export interface SupabaseRepository {
  getSession: () => Session | null;
  getUser: () => User | null;
  loginViaMagicLink: (email: string) => Promise<OAuthResponse>;
  logout: () => Promise<LogoutResponse>;
  onAuthStateChange: (callback: OnAuthStateChangeCallback) => OnAuthStateChangeResponse;
}
