import { Session, User } from '@supabase/supabase-js';

import {
  ILogoutResponse,
  IOAuthResponse,
  IOnAuthStateChangeResponse,
  TOnAuthStateChangeCallback,
} from './supabase.models';

export interface ISupabaseRepository {
  getSession: () => Session | null;
  getUser: () => User | null;
  loginViaMagicLink: (email: string) => Promise<IOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
  onAuthStateChange: (callback: TOnAuthStateChangeCallback) => IOnAuthStateChangeResponse;
}
