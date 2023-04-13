import { getRestRepository } from '@repository/rest/rest.repository';
import { getSupabaseRepository } from '@repository/supabase/supabase.repository';

import { getRestApi } from '@api/rest/rest.api';
import { getSupabaseApi } from '@api/supabase/supabase.api';

import {
  getSessionUseCase,
  getUserUseCase,
  loginViaMagicLinkUseCase,
  logoutUseCase,
  onAuthStateChangeUseCase,
} from '@domain/supabase/supabase.use-cases';

import { axiosInstance } from '@shared/axios.instance';

import { supabaseInstance } from '@config/supabase.instance';

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
  loginViaMagicLink: loginViaMagicLinkUseCase(supabaseRepository).execute,
  onAuthStateChange: onAuthStateChangeUseCase(supabaseRepository).execute,
};
