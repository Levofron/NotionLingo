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

import { axiosInstance, supabaseInstance } from '@infrastructure/config';

// apis
const restApi = getRestApi(axiosInstance);
const supabaseApi = getSupabaseApi(supabaseInstance);

// repositories
const supabaseRepository = getSupabaseRepository(supabaseApi);
const restRepository = getRestRepository(restApi, supabaseApi);

export const supabaseModule = {
  getUser: getUserUseCase(supabaseRepository).execute,
  getSession: getSessionUseCase(supabaseRepository).execute,
  logout: logoutUseCase(supabaseRepository, restRepository).execute,
  loginViaGoogle: loginViaGoogleUseCase(supabaseRepository).execute,
  onAuthStateChange: onAuthStateChangeUseCase(supabaseRepository).execute,
};
