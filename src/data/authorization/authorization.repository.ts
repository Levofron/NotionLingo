import { IAuthorizationRepository } from '@domain/authorization/authorization.repository';
import { TSupabaseClient } from '@domain/authorization/authorization.types';

export const getAuthorizationRepository = (
  supabaseInstance: TSupabaseClient,
): IAuthorizationRepository => ({
  loginViaGoogle: () =>
    supabaseInstance.auth.signInWithOAuth({
      provider: 'google',
    }),
  logout: () => supabaseInstance.auth.signOut(),
});
