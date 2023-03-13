import { getRestRepository } from '@repositories/rest/rest.repository';
import { getSpeechSynthesisRepository } from '@repositories/speech-synthesis/speech-synthesis.repository';

import { getLocalStorageApi } from '@api/local-storage/local-storage.api';
import { getRestApi } from '@api/rest/rest.api';
import { getSpeechSynthesisApi } from '@api/speech-synthesis/speech-synthesis.api';
import { getSupabaseApi } from '@api/supabase/supabase.api';

import {
  createNotionWordUseCase,
  deleteProfileUseCase,
  getAvailableNotionDatabasesUseCase,
  getDictionarySuggestionsUseCase,
  getLoggedProfileUseCase,
  getNotionTableColumnsUseCase,
  getRandomNotionWordsUseCase,
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
const localStorageApi = getLocalStorageApi();
const speechSynthesisApi = getSpeechSynthesisApi();
const supabaseApi = getSupabaseApi(supabaseInstance);

// repositories
const restRepository = getRestRepository(restApi, supabaseApi);
const speechSynthesisRepository = getSpeechSynthesisRepository(speechSynthesisApi, localStorageApi);

export const restModule = {
  healthCheck: healthCheckUseCase(restRepository).execute,
  deleteProfile: deleteProfileUseCase(restRepository).execute,
  getLoggedProfile: getLoggedProfileUseCase(restRepository).execute,
  updateNotionWord: updateNotionWordUseCase(restRepository).execute,
  createNotionWord: createNotionWordUseCase(restRepository).execute,
  setNotionApiToken: setNotionApiTokenUseCase(restRepository).execute,
  setSupabaseCookie: setSupabaseCookieUseCase(restRepository).execute,
  sendContactFormData: sendContactFormDataUseCase(restRepository).execute,
  setNotionDatabaseId: setNotionDatabaseIdUseCase(restRepository).execute,
  getRandomNotionWords: getRandomNotionWordsUseCase(restRepository).execute,
  getNotionTableColumns: getNotionTableColumnsUseCase(restRepository).execute,
  resetNotionIntegration: resetNotionIntegrationUseCase(restRepository).execute,
  getDictionarySuggestions: getDictionarySuggestionsUseCase(restRepository).execute,
  getAvailableNotionDatabases: getAvailableNotionDatabasesUseCase(restRepository).execute,
  increaseDailyStreak: increaseDailyStreakUseCase(restRepository, speechSynthesisRepository)
    .execute,
};
