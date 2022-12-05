import { ApiError, Provider, Session, SupabaseClient, User } from '@supabase/supabase-js';

export type TSupabaseClient = SupabaseClient;

export type TUser = User;

export type TSession = Session;

export type TProvider = Provider;

export type TApiError = ApiError;

export interface ILogoutResponse {
  error: TApiError | null;
}

export interface IOAuthResponse extends ILogoutResponse {
  provider?: Provider;
  session: TSession | null;
  url?: string | null;
  user: TUser | null;
}
