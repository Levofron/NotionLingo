import {
  AuthError,
  OAuthResponse,
  Session,
  SupabaseClient,
  UserResponse,
} from '@supabase/supabase-js';

export type TOAuthResponse = OAuthResponse;

export type TSupabaseClient = SupabaseClient;

export type TUserResponse = UserResponse;

export type TSessionResponse =
  | {
      data: {
        session: Session;
      };
      error: null;
    }
  | {
      data: {
        session: null;
      };
      error: AuthError;
    }
  | {
      data: {
        session: null;
      };
      error: null;
    };

export interface ILogoutResponse {
  error: AuthError | null;
}
