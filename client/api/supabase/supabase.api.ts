import { SupabaseClient } from '@supabase/supabase-js';

import { ISupabaseApi } from './supabase.types';

export const getSupabaseApi = (supabaseInstance: SupabaseClient): ISupabaseApi => ({
  signIn: (userCreditials) => supabaseInstance.auth.signIn(userCreditials),
  logout: () => supabaseInstance.auth.signOut(),
  getUser: () => supabaseInstance.auth.user(),
  getSession: () => supabaseInstance.auth.session(),
  onAuthStateChange: (callback) => supabaseInstance.auth.onAuthStateChange(callback),
});
