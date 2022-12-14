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
  getUser: () => Promise.resolve(supabaseInstance.auth.user()),
  getSession: () => Promise.resolve(supabaseInstance.auth.session()),
  onAuthStateChange: (callback: TOnAuthStateChangeCallback) =>
    Promise.resolve(supabaseInstance.auth.onAuthStateChange(callback)),
});
