import { Provider, Session, User } from '@supabase/supabase-js';

import {
  ILogoutResponse,
  IOAuthResponse,
  IOnAuthStateChangeResponse,
  TOnAuthStateChangeCallback,
} from '@domain/entities/supabase.types';

export interface ISupabaseApi {
  getSession: () => Session | null;
  getUser: () => User | null;
  logout: () => Promise<ILogoutResponse>;
  onAuthStateChange: (callback: TOnAuthStateChangeCallback) => IOnAuthStateChangeResponse;
  signIn: (provider: Provider) => Promise<IOAuthResponse>;
}
