import {
  getSessionUseCase,
  getUserUseCase,
  loginViaGoogleUseCase,
  logoutUseCase,
  onAuthStateChangeUseCase,
} from '@domain/supabase/supabase.use-case';

import { getSupabaseRepository } from '@data/repositories/supabase.repository';
import { getSupabaseSource } from '@data/sources/supabase/supabase.source';

import { supabaseInstance } from '@infrastructure';

// sources
const supabaseSource = getSupabaseSource(supabaseInstance);

// repositories
const supabaseRepository = getSupabaseRepository(supabaseSource);

export const supabaseModule = {
  logout: logoutUseCase(supabaseRepository).execute,
  getUser: getUserUseCase(supabaseRepository).execute,
  getSession: getSessionUseCase(supabaseRepository).execute,
  loginViaGoogle: loginViaGoogleUseCase(supabaseRepository).execute,
  onAuthStateChange: onAuthStateChangeUseCase(supabaseRepository).execute,
};
