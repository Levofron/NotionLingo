import { IAuthorizationSource } from './authorization.types';

import { TSupabaseClient } from '@domain/authorization/authorization.types';

export const getAuthorizationSource = (
  supabaseInstance: TSupabaseClient,
): IAuthorizationSource => ({
  loginViaGoogle: () =>
    supabaseInstance.auth.signInWithOAuth({
      provider: 'google',
    }),
  logout: () => supabaseInstance.auth.signOut(),
});
