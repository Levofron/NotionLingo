import { IAuthorizationRepository } from '@domain/authorization/authorization.repository';
import { SupabaseClient } from '@supabase/supabase-js';

export const getAuthorizationRepository = (
  supabaseInstance: SupabaseClient,
): IAuthorizationRepository => ({
  async loginViaGoogle(): Promise<void> {
    supabaseInstance.auth.signInWithOAuth({
      provider: 'google',
    });
  },
});
