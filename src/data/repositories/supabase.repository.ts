import { ISupabaseSource } from '../sources/supabase/supabase.types';
import { ISupabaseRepository } from '@domain/supabase/supabase.repository';

export const getSupabaseRepository = (supabaseSource: ISupabaseSource): ISupabaseRepository => ({
  loginViaGoogle: () => supabaseSource.loginWithOAuth('google'),
  logout: () => supabaseSource.logout(),
  getUser: () => supabaseSource.getUser(),
});
