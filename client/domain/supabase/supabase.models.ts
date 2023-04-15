import {
  ApiError,
  AuthChangeEvent,
  Provider,
  Session,
  Subscription,
  User,
} from '@supabase/supabase-js';

export interface LogoutResponse {
  error: ApiError | null;
}

export interface OnAuthStateChangeResponse {
  data: Subscription | null;
  error: ApiError | null;
}

export interface OAuthResponse extends LogoutResponse {
  provider?: Provider;
  session: Session | null;
  url?: string | null;
  user: User | null;
}

export type OnAuthStateChangeCallback = (event: AuthChangeEvent, session: Session | null) => void;
