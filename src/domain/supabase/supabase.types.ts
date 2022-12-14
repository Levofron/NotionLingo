import {
  ApiError,
  AuthChangeEvent,
  Provider,
  Session,
  Subscription,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

export type TSupabaseClient = SupabaseClient;

export type TUser = User;

export type TSession = Session;

export type TProvider = Provider;

export type TApiError = ApiError;

export type TSubscription = Subscription;

export type TAuthChangeEvent = AuthChangeEvent;

export interface ILogoutResponse {
  error: TApiError | null;
}

export interface IOnAuthStateChangeResponse {
  data: Subscription | null;
  error: TApiError | null;
}

export interface IOAuthResponse extends ILogoutResponse {
  provider?: Provider;
  session: TSession | null;
  url?: string | null;
  user: TUser | null;
}

export type TOnAuthStateChangeCallback = (
  event: TAuthChangeEvent,
  session: TSession | null,
) => void;
