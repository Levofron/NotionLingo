import { AuthError, OAuthResponse, SupabaseClient, UserResponse } from '@supabase/supabase-js';

export type TOAuthResponse = OAuthResponse;

export type TSupabaseClient = SupabaseClient;

export type TUserResponse = UserResponse;

export interface ILogoutResponse {
  error: AuthError | null;
}
