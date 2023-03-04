import { Provider, SupabaseClient } from '@supabase/supabase-js';

import { TOnAuthStateChangeCallback } from '@domain/entities/supabase.types';

import { ISupabaseApi } from './supabase.types';

export const getSupabaseApi = (supabaseInstance: SupabaseClient): ISupabaseApi => ({
  signIn: (provider: Provider) =>
    supabaseInstance.auth.signIn({
      provider,
    }),
  logout: () => supabaseInstance.auth.signOut(),
  getUser: () => supabaseInstance.auth.user(),
  getSession: () => supabaseInstance.auth.session(),
  onAuthStateChange: (callback: TOnAuthStateChangeCallback) =>
    supabaseInstance.auth.onAuthStateChange(callback),
});
