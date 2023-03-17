import { getRestRepository } from '@repositories/rest/rest.repository';
import { getSupabaseRepository } from '@repositories/supabase/supabase.repository';

import { getRestApi } from '@api/rest/rest.api';
import { getSupabaseApi } from '@api/supabase/supabase.api';

import {
  getSessionUseCase,
  getUserUseCase,
  loginViaGoogleUseCase,
  logoutUseCase,
  onAuthStateChangeUseCase,
} from '@domain/use-cases/supabase.use-cases';

import { axiosInstance } from '@infrastructure/config';

import { supabaseInstance } from '@config/supabase/supabase.instance';

// apis
const restApi = getRestApi(axiosInstance);
const supabaseApi = getSupabaseApi(supabaseInstance);

// repositories
const restRepository = getRestRepository(restApi);
const supabaseRepository = getSupabaseRepository(supabaseApi);

export const supabaseModule = {
  getUser: getUserUseCase(supabaseRepository).execute,
  getSession: getSessionUseCase(supabaseRepository).execute,
  logout: logoutUseCase(supabaseRepository, restRepository).execute,
  loginViaGoogle: loginViaGoogleUseCase(supabaseRepository).execute,
  onAuthStateChange: onAuthStateChangeUseCase(supabaseRepository).execute,
};
