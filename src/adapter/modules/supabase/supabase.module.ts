import { getSupabaseApi } from '@api/supabase/supabase.api';
import { getSupabaseRepository } from '@repositories/supabase/supabase.repository';

import {
  getSessionUseCase,
  getUserUseCase,
  loginViaGoogleUseCase,
  logoutUseCase,
  onAuthStateChangeUseCase,
} from '@domain/use-cases/supabase.use-cases';

import { supabaseInstance } from '@infrastructure/config';

// apis
const supabaseApi = getSupabaseApi(supabaseInstance);

// repositories
const supabaseRepository = getSupabaseRepository(supabaseApi);

export const supabaseModule = {
  logout: logoutUseCase(supabaseRepository).execute,
  getUser: getUserUseCase(supabaseRepository).execute,
  getSession: getSessionUseCase(supabaseRepository).execute,
  loginViaGoogle: loginViaGoogleUseCase(supabaseRepository).execute,
  onAuthStateChange: onAuthStateChangeUseCase(supabaseRepository).execute,
};
