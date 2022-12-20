import {
  TOnAuthStateChangeCallback,
  TProvider,
  TSupabaseClient,
} from '@domain/supabase/supabase.types';

import { ISupabaseSource } from './supabase.types';

export const getSupabaseSource = (supabaseInstance: TSupabaseClient): ISupabaseSource => ({
  signIn: (provider: TProvider) =>
    supabaseInstance.auth.signIn({
      provider,
    }),
  logout: () => supabaseInstance.auth.signOut(),
  getUser: () => supabaseInstance.auth.user(),
  getSession: () => supabaseInstance.auth.session(),
  onAuthStateChange: (callback: TOnAuthStateChangeCallback) =>
    supabaseInstance.auth.onAuthStateChange(callback),
});
