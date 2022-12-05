import { ISupabaseRepository } from '@domain/supabase/supabase.repository';

import { ISupabaseSource } from '../sources/supabase/supabase.types';

export const getSupabaseRepository = (supabaseSource: ISupabaseSource): ISupabaseRepository => ({
  loginViaGoogle: () => supabaseSource.signIn('google'),
  logout: () => supabaseSource.logout(),
  getUser: () => supabaseSource.getUser(),
  getSession: () => supabaseSource.getSession(),
});
