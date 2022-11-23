import { ISupabaseSource } from './supabase.types';

import { TSupabaseClient } from '@domain/supabase/supabase.types';

export const getSupabaseSource = (supabaseInstance: TSupabaseClient): ISupabaseSource => ({
  loginViaGoogle: () =>
    supabaseInstance.auth.signIn({
      provider: 'google',
    }),
  logout: () => supabaseInstance.auth.signOut(),
  getUser: () => Promise.resolve(supabaseInstance.auth.user()),
  getSession: () => Promise.resolve(supabaseInstance.auth.session()),
});
