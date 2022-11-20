import { ISupabaseSource } from './supabase.types';

import { TSupabaseClient } from '@domain/supabase/supabase.types';

export const getSupabaseSource = (supabaseInstance: TSupabaseClient): ISupabaseSource => ({
  loginViaGoogle: () =>
    supabaseInstance.auth.signInWithOAuth({
      provider: 'google',
    }),
  logout: () => supabaseInstance.auth.signOut(),
});
