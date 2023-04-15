import { SupabaseApi } from '@api/supabase/supabase.types';

import { SupabaseRepository } from '@domain/supabase/supabase.repository';

export const getSupabaseRepository = (supabaseApi: SupabaseApi): SupabaseRepository => ({
  loginViaMagicLink: (email) => supabaseApi.signIn({ email }),
  logout: () => supabaseApi.logout(),
  getUser: () => supabaseApi.getUser(),
  getSession: () => supabaseApi.getSession(),
  onAuthStateChange: (callback) => supabaseApi.onAuthStateChange(callback),
});
