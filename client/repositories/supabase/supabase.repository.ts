import { ISupabaseApi } from '@api/supabase/supabase.types';

import { ISupabaseRepository } from '@domain/repositories/supabase.repository';

export const getSupabaseRepository = (supabaseApi: ISupabaseApi): ISupabaseRepository => ({
  loginViaGoogle: () => supabaseApi.signIn('google'),
  logout: () => supabaseApi.logout(),
  getUser: () => supabaseApi.getUser(),
  getSession: () => supabaseApi.getSession(),
  onAuthStateChange: (callback) => supabaseApi.onAuthStateChange(callback),
});
