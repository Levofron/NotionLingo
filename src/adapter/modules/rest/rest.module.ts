import {
  deleteProfileUseCase,
  getAvailableNotionDatabasesUseCase,
  getLoggedUserUseCase,
  getRandomNotionWordsUseCase,
  healthCheckUseCase,
  increaseDailyStreakUseCase,
  resetNotionIntegrationUseCase,
  sendContactFormDataUseCase,
  setNotionApiTokenUseCase,
  setNotionDatabaseIdUseCase,
  setSupabaseCookieUseCase,
} from '@domain/rest/rest.use-case';

import { getRestRepository } from '@data/repositories/rest/rest.repository';
import { getRestSource } from '@data/sources/rest/rest.source';
import { getSupabaseSource } from '@data/sources/supabase/supabase.source';

import { axiosInstance, supabaseInstance } from '@infrastructure/config';

// sources
const restSource = getRestSource(axiosInstance);
const supabaseSource = getSupabaseSource(supabaseInstance);

// repositories
const restRepository = getRestRepository(restSource, supabaseSource);

export const restModule = {
  healthCheck: healthCheckUseCase(restRepository).execute,
  getLoggedUser: getLoggedUserUseCase(restRepository).execute,
  deleteProfile: deleteProfileUseCase(restRepository).execute,
  setNotionApiToken: setNotionApiTokenUseCase(restRepository).execute,
  setSupabaseCookie: setSupabaseCookieUseCase(restRepository).execute,
  sendContactFormData: sendContactFormDataUseCase(restRepository).execute,
  increaseDailyStreak: increaseDailyStreakUseCase(restRepository).execute,
  setNotionDatabaseId: setNotionDatabaseIdUseCase(restRepository).execute,
  getRandomNotionWords: getRandomNotionWordsUseCase(restRepository).execute,
  resetNotionIntegration: resetNotionIntegrationUseCase(restRepository).execute,
  getAvailableNotionDatabases: getAvailableNotionDatabasesUseCase(restRepository).execute,
};
