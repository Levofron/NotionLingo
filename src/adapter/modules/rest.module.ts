import {
  healthCheckUseCase,
  setSupabaseCookieUseCase,
  getLoggedUserUseCase,
} from '@domain/rest/rest.use-case';
import { getRestRepository } from '@data/repositories/rest.repository';
import { getRestSource } from '@data/sources/rest/rest.source';
import { getSupabaseSource } from '@data/sources/supabase/supabase.source';

import { axiosInstance, supabaseInstance } from '@infrastructure';

// sources
const restSource = getRestSource(axiosInstance);
const supabaseSource = getSupabaseSource(supabaseInstance);

// repositories
const restRepository = getRestRepository(restSource, supabaseSource);

export const restModule = {
  healthCheck: healthCheckUseCase(restRepository).execute,
  getLoggedUser: getLoggedUserUseCase(restRepository).execute,
  setSupabaseCookie: setSupabaseCookieUseCase(restRepository).execute,
};
