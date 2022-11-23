import { ISupabaseSource } from './supabase.types';

import { TSupabaseClient } from '@domain/supabase/supabase.types';
import { Provider } from '@supabase/supabase-js';

export const getSupabaseSource = (supabaseInstance: TSupabaseClient): ISupabaseSource => ({
  loginWithOAuth: (provider: Provider) =>
    supabaseInstance.auth.signInWithOAuth({
      provider,
    }),
  logout: () => supabaseInstance.auth.signOut(),
  getUser: () => supabaseInstance.auth.getUser(),
  getSession: () => supabaseInstance.auth.getSession(),
});
