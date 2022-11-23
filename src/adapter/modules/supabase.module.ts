import {
  loginViaGoogleUseCase,
  logoutUseCase,
  getUserUseCase,
  getSessionUseCase,
} from '@domain/supabase/supabase.use-case';
import { supabaseInstance } from '@infrastructure';
import { getSupabaseSource } from '@data/sources/supabase/supabase.source';
import { getSupabaseRepository } from '@data/repositories/supabase.repository';

// sources
const supabaseSource = getSupabaseSource(supabaseInstance);

// repositories
const supabaseRepository = getSupabaseRepository(supabaseSource);

export const supabaseModule = {
  logout: logoutUseCase(supabaseRepository).execute,
  getUser: getUserUseCase(supabaseRepository).execute,
  getSession: getSessionUseCase(supabaseRepository).execute,
  loginViaGoogle: loginViaGoogleUseCase(supabaseRepository).execute,
};
