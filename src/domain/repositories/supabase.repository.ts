import { Session, User } from '@supabase/supabase-js';

import {
  ILogoutResponse,
  IOAuthResponse,
  IOnAuthStateChangeResponse,
  TOnAuthStateChangeCallback,
} from '../entities/supabase.types';

export interface ISupabaseRepository {
  getSession: () => Session | null;
  getUser: () => User | null;
  loginViaGoogle: () => Promise<IOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
  onAuthStateChange: (callback: TOnAuthStateChangeCallback) => IOnAuthStateChangeResponse;
}
