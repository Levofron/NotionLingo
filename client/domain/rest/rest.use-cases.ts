import { ISpeechSynthesisRepository } from '@domain/speech-synthesis/speech-synthesis.repository';
import { ISupabaseRepository } from '@domain/supabase/supabase.repository';

import {
  IUseCaseWithSingleParamAndPromiseResult,
  IUseCaseWithoutParamsAndPromiseResult,
} from '../use-cases.types';
import {
  IContact,
  IDictionarySuggestions,
  IHash,
  IIncreaseDailyStreak,
  INotionDatabase,
  INotionWord,
  IProfile,
  IUpdateNotionWordRequest,
  NotionTableColumn,
} from './rest.models';
import { IRestRepository } from './rest.repository';

// healthCheckUseCase
export type HealthCheckUseCase = IUseCaseWithoutParamsAndPromiseResult<string>;

export const healthCheckUseCase = (restRepository: IRestRepository): HealthCheckUseCase => ({
  execute: () => restRepository.healthCheck(),
});

// setSupabaseCookieUseCase
export type SetSupabaseCookieUseCase = IUseCaseWithoutParamsAndPromiseResult<void>;

export const setSupabaseCookieUseCase = (
  restRepository: IRestRepository,
  supabaseRepository: ISupabaseRepository,
): SetSupabaseCookieUseCase => ({
  execute: () => {
    const session = supabaseRepository.getSession();

    return restRepository.setSupabaseCookie(session);
  },
});

// getLoggedProfileUseCase
export type GetLoggedProfileUseCase = IUseCaseWithoutParamsAndPromiseResult<IProfile>;

export const getLoggedProfileUseCase = (
  restRepository: IRestRepository,
): GetLoggedProfileUseCase => ({
  execute: () => restRepository.getLoggedProfile(),
});

// setNotionApiTokenUseCase
export type SetNotionApiTokenUseCase = IUseCaseWithSingleParamAndPromiseResult<string, IHash>;

export const setNotionApiTokenUseCase = (
  restRepository: IRestRepository,
): SetNotionApiTokenUseCase => ({
  execute: (token) => restRepository.setNotionApiToken(token),
});

// getAvailableNotionDatabasesUseCase
export type GetAvailableNotionDatabasesUseCase = IUseCaseWithoutParamsAndPromiseResult<
  INotionDatabase[]
>;

export const getAvailableNotionDatabasesUseCase = (
  restRepository: IRestRepository,
): GetAvailableNotionDatabasesUseCase => ({
  execute: () => restRepository.getAvailableNotionDatabases(),
});

// setNotionDatabaseIdUseCase
export type SetNotionDatabaseIdUseCase = IUseCaseWithSingleParamAndPromiseResult<string, string>;

export const setNotionDatabaseIdUseCase = (
  restRepository: IRestRepository,
): SetNotionDatabaseIdUseCase => ({
  execute: (databaseId) => restRepository.setNotionDatabaseId(databaseId),
});

// getRandomNotionWordsUseCase
export type GetRandomNotionWordsUseCase = IUseCaseWithoutParamsAndPromiseResult<INotionWord[]>;

export const getRandomNotionWordsUseCase = (
  restRepository: IRestRepository,
): GetRandomNotionWordsUseCase => ({
  execute: () => restRepository.getRandomNotionWords(),
});

// sendContactFormDataUseCase
export type SendContactFormDataUseCase = IUseCaseWithSingleParamAndPromiseResult<
  IContact,
  IContact
>;

export const sendContactFormDataUseCase = (
  restRepository: IRestRepository,
): SendContactFormDataUseCase => ({
  execute: (data) => restRepository.sendContactFormData(data),
});

// increaseDailyStreakUseCase
export type IncreaseDailyStreakUseCase =
  IUseCaseWithoutParamsAndPromiseResult<IIncreaseDailyStreak>;

export const increaseDailyStreakUseCase = (
  restRepository: IRestRepository,
  speechSynthesisRepository: ISpeechSynthesisRepository,
): IncreaseDailyStreakUseCase => ({
  execute: () => {
    speechSynthesisRepository.cancel();

    return restRepository.increaseDailyStreak();
  },
});

// resetNotionIntegrationUseCase
export type ResetNotionIntegrationUseCase = IUseCaseWithoutParamsAndPromiseResult<void>;

export const resetNotionIntegrationUseCase = (
  restRepository: IRestRepository,
): ResetNotionIntegrationUseCase => ({
  execute: () => restRepository.resetNotionIntegration(),
});

// deleteProfileUseCase
export type DeleteProfileUseCase = IUseCaseWithoutParamsAndPromiseResult<void>;

export const deleteProfileUseCase = (
  restRepository: IRestRepository,
  supabaseRepository: ISupabaseRepository,
): DeleteProfileUseCase => ({
  execute: async () => {
    await restRepository.deleteProfile();

    supabaseRepository.logout();
  },
});

// getDictionarySuggestionsUseCase
export type GetDictionarySuggestionsUseCaseUseCase = IUseCaseWithSingleParamAndPromiseResult<
  string,
  IDictionarySuggestions | null
>;

export const getDictionarySuggestionsUseCase = (
  restRepository: IRestRepository,
): GetDictionarySuggestionsUseCaseUseCase => ({
  execute: (word) => restRepository.getDictionarySuggestions(word),
});

// updateNotionWordUseCase
export type UpdateNotionWordUseCase = IUseCaseWithSingleParamAndPromiseResult<
  IUpdateNotionWordRequest,
  INotionWord[]
>;

export const updateNotionWordUseCase = (
  restRepository: IRestRepository,
): UpdateNotionWordUseCase => ({
  execute: (data) => restRepository.updateNotionWord(data),
});

// getNotionTableColumnsUseCase
export type GetNotionTableColumnsUseCase = IUseCaseWithoutParamsAndPromiseResult<
  NotionTableColumn[]
>;

export const getNotionTableColumnsUseCase = (
  restRepository: IRestRepository,
): GetNotionTableColumnsUseCase => ({
  execute: () => restRepository.getNotionTableColumns(),
});

// createNotionWordUseCase
export type CreateNotionWordUseCase = IUseCaseWithSingleParamAndPromiseResult<
  Record<string, string>,
  string
>;

export const createNotionWordUseCase = (
  restRepository: IRestRepository,
): CreateNotionWordUseCase => ({
  execute: (word) => restRepository.createNotionWord(word),
});
