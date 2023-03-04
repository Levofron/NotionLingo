import { getRestRepository } from '@repositories/rest/rest.repository';

import { getRestApi } from '@api/rest/rest.api';
import { getSupabaseApi } from '@api/supabase/supabase.api';

import {
  createNotionWordUseCase,
  deleteProfileUseCase,
  getAvailableNotionDatabasesUseCase,
  getLoggedProfileUseCase,
  getNotionTableColumnsUseCase,
  getRandomNotionWordsUseCase,
  getWordSuggestionsUseCase,
  healthCheckUseCase,
  increaseDailyStreakUseCase,
  resetNotionIntegrationUseCase,
  sendContactFormDataUseCase,
  setNotionApiTokenUseCase,
  setNotionDatabaseIdUseCase,
  setSupabaseCookieUseCase,
  updateNotionWordUseCase,
} from '@domain/use-cases/rest.use-cases';

import { axiosInstance } from '@infrastructure/config';

import { supabaseInstance } from '@config/supabase/supabase.instance';

// apis
const restApi = getRestApi(axiosInstance);
const supabaseApi = getSupabaseApi(supabaseInstance);

// repositories
const restRepository = getRestRepository(restApi, supabaseApi);

export const restModule = {
  healthCheck: healthCheckUseCase(restRepository).execute,
  deleteProfile: deleteProfileUseCase(restRepository).execute,
  getLoggedProfile: getLoggedProfileUseCase(restRepository).execute,
  updateNotionWord: updateNotionWordUseCase(restRepository).execute,
  createNotionWord: createNotionWordUseCase(restRepository).execute,
  setNotionApiToken: setNotionApiTokenUseCase(restRepository).execute,
  setSupabaseCookie: setSupabaseCookieUseCase(restRepository).execute,
  getWordSuggestions: getWordSuggestionsUseCase(restRepository).execute,
  sendContactFormData: sendContactFormDataUseCase(restRepository).execute,
  increaseDailyStreak: increaseDailyStreakUseCase(restRepository).execute,
  setNotionDatabaseId: setNotionDatabaseIdUseCase(restRepository).execute,
  getRandomNotionWords: getRandomNotionWordsUseCase(restRepository).execute,
  getNotionTableColumns: getNotionTableColumnsUseCase(restRepository).execute,
  resetNotionIntegration: resetNotionIntegrationUseCase(restRepository).execute,
  getAvailableNotionDatabases: getAvailableNotionDatabasesUseCase(restRepository).execute,
};
