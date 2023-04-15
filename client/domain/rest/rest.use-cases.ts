import { SpeechSynthesisRepository } from '@domain/speech-synthesis/speech-synthesis.repository';
import { SupabaseRepository } from '@domain/supabase/supabase.repository';

import {
  UseCaseWithSingleParamAndPromiseResult,
  UseCaseWithoutParamsAndPromiseResult,
} from '../use-cases.types';
import {
  Contact,
  DictionarySuggestions,
  Hash,
  IncreaseDailyStreak,
  NotionDatabase,
  NotionTableColumn,
  NotionWord,
  Profile,
  UpdateNotionWordRequest,
} from './rest.models';
import { RestRepository } from './rest.repository';

// healthCheckUseCase
export type HealthCheckUseCase = UseCaseWithoutParamsAndPromiseResult<string>;

export const healthCheckUseCase = (restRepository: RestRepository): HealthCheckUseCase => ({
  execute: () => restRepository.healthCheck(),
});

// setSupabaseCookieUseCase
export type SetSupabaseCookieUseCase = UseCaseWithoutParamsAndPromiseResult<void>;

export const setSupabaseCookieUseCase = (
  restRepository: RestRepository,
  supabaseRepository: SupabaseRepository,
): SetSupabaseCookieUseCase => ({
  execute: () => {
    const session = supabaseRepository.getSession();

    return restRepository.setSupabaseCookie(session);
  },
});

// getLoggedProfileUseCase
export type GetLoggedProfileUseCase = UseCaseWithoutParamsAndPromiseResult<Profile>;

export const getLoggedProfileUseCase = (
  restRepository: RestRepository,
): GetLoggedProfileUseCase => ({
  execute: () => restRepository.getLoggedProfile(),
});

// setNotionApiTokenUseCase
export type SetNotionApiTokenUseCase = UseCaseWithSingleParamAndPromiseResult<string, Hash>;

export const setNotionApiTokenUseCase = (
  restRepository: RestRepository,
): SetNotionApiTokenUseCase => ({
  execute: (token) => restRepository.setNotionApiToken(token),
});

// getAvailableNotionDatabasesUseCase
export type GetAvailableNotionDatabasesUseCase = UseCaseWithoutParamsAndPromiseResult<
  NotionDatabase[]
>;

export const getAvailableNotionDatabasesUseCase = (
  restRepository: RestRepository,
): GetAvailableNotionDatabasesUseCase => ({
  execute: () => restRepository.getAvailableNotionDatabases(),
});

// setNotionDatabaseIdUseCase
export type SetNotionDatabaseIdUseCase = UseCaseWithSingleParamAndPromiseResult<string, string>;

export const setNotionDatabaseIdUseCase = (
  restRepository: RestRepository,
): SetNotionDatabaseIdUseCase => ({
  execute: (databaseId) => restRepository.setNotionDatabaseId(databaseId),
});

// getRandomNotionWordsUseCase
export type GetRandomNotionWordsUseCase = UseCaseWithoutParamsAndPromiseResult<NotionWord[]>;

export const getRandomNotionWordsUseCase = (
  restRepository: RestRepository,
): GetRandomNotionWordsUseCase => ({
  execute: () => restRepository.getRandomNotionWords(),
});

// sendContactFormDataUseCase
export type SendContactFormDataUseCase = UseCaseWithSingleParamAndPromiseResult<Contact, Contact>;

export const sendContactFormDataUseCase = (
  restRepository: RestRepository,
): SendContactFormDataUseCase => ({
  execute: (data) => restRepository.sendContactFormData(data),
});

// increaseDailyStreakUseCase
export type IncreaseDailyStreakUseCase = UseCaseWithoutParamsAndPromiseResult<IncreaseDailyStreak>;

export const increaseDailyStreakUseCase = (
  restRepository: RestRepository,
  speechSynthesisRepository: SpeechSynthesisRepository,
): IncreaseDailyStreakUseCase => ({
  execute: () => {
    speechSynthesisRepository.cancel();

    return restRepository.increaseDailyStreak();
  },
});

// resetNotionIntegrationUseCase
export type ResetNotionIntegrationUseCase = UseCaseWithoutParamsAndPromiseResult<void>;

export const resetNotionIntegrationUseCase = (
  restRepository: RestRepository,
): ResetNotionIntegrationUseCase => ({
  execute: () => restRepository.resetNotionIntegration(),
});

// deleteProfileUseCase
export type DeleteProfileUseCase = UseCaseWithoutParamsAndPromiseResult<void>;

export const deleteProfileUseCase = (
  restRepository: RestRepository,
  supabaseRepository: SupabaseRepository,
): DeleteProfileUseCase => ({
  execute: async () => {
    await restRepository.deleteProfile();

    supabaseRepository.logout();
  },
});

// getDictionarySuggestionsUseCase
export type GetDictionarySuggestionsUseCaseUseCase = UseCaseWithSingleParamAndPromiseResult<
  string,
  DictionarySuggestions | null
>;

export const getDictionarySuggestionsUseCase = (
  restRepository: RestRepository,
): GetDictionarySuggestionsUseCaseUseCase => ({
  execute: (word) => restRepository.getDictionarySuggestions(word),
});

// updateNotionWordUseCase
export type UpdateNotionWordUseCase = UseCaseWithSingleParamAndPromiseResult<
  UpdateNotionWordRequest,
  NotionWord[]
>;

export const updateNotionWordUseCase = (
  restRepository: RestRepository,
): UpdateNotionWordUseCase => ({
  execute: (data) => restRepository.updateNotionWord(data),
});

// getNotionTableColumnsUseCase
export type GetNotionTableColumnsUseCase = UseCaseWithoutParamsAndPromiseResult<
  NotionTableColumn[]
>;

export const getNotionTableColumnsUseCase = (
  restRepository: RestRepository,
): GetNotionTableColumnsUseCase => ({
  execute: () => restRepository.getNotionTableColumns(),
});

// createNotionWordUseCase
export type CreateNotionWordUseCase = UseCaseWithSingleParamAndPromiseResult<
  Record<string, string>,
  string
>;

export const createNotionWordUseCase = (
  restRepository: RestRepository,
): CreateNotionWordUseCase => ({
  execute: (word) => restRepository.createNotionWord(word),
});
