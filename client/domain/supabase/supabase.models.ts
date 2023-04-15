import {
  ApiError,
  AuthChangeEvent,
  Provider,
  Session,
  Subscription,
  User,
} from '@supabase/supabase-js';

export interface ILogoutResponse {
  error: ApiError | null;
}

export interface IOnAuthStateChangeResponse {
  data: Subscription | null;
  error: ApiError | null;
}

export interface IOAuthResponse extends ILogoutResponse {
  provider?: Provider;
  session: Session | null;
  url?: string | null;
  user: User | null;
}

export type OnAuthStateChangeCallback = (event: AuthChangeEvent, session: Session | null) => void;
