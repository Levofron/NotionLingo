import { ISupabaseApi } from '@api/supabase/supabase.types';

import { ISupabaseRepository } from '@domain/supabase/supabase.repository';

export const getSupabaseRepository = (supabaseApi: ISupabaseApi): ISupabaseRepository => ({
  loginViaMagicLink: (email) => supabaseApi.signIn({ email }),
  logout: () => supabaseApi.logout(),
  getUser: () => supabaseApi.getUser(),
  getSession: () => supabaseApi.getSession(),
  onAuthStateChange: (callback) => supabaseApi.onAuthStateChange(callback),
});
