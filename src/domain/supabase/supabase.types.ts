import { AuthError, OAuthResponse, SupabaseClient } from '@supabase/supabase-js';

export type TOAuthResponse = OAuthResponse;

export type TSupabaseClient = SupabaseClient;

export interface ILogoutResponse {
  error: AuthError | null;
}
