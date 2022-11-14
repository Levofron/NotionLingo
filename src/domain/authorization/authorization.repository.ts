import { OAuthResponse } from '@supabase/supabase-js';

export interface IAuthorizationRepository {
  loginViaGoogle: () => Promise<OAuthResponse>;
}
