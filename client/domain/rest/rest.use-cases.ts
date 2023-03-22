import { ISpeechSynthesisRepository } from '@domain/speech-synthesis/speech-synthesis.repository';
import { ISupabaseRepository } from '@domain/supabase/supabase.repository';

import {
  IUseCaseWithSingleParamAndPromiseResult,
  IUseCaseWithoutParamsAndPromiseResult,
} from '../use-cases.types';
import { IRestRepository } from './rest.repository';
import {
  IContact,
  IDictionarySuggestions,
  IHash,
  IIncreaseDailyStreak,
  INotionDatabase,
  INotionWord,
  IProfile,
  IUpdateNotionWordRequest,
  TNotionTableColumn,
} from './rest.types';

// healthCheckUseCase
export type THealthCheckUseCase = IUseCaseWithoutParamsAndPromiseResult<string>;

export const healthCheckUseCase = (restRepository: IRestRepository): THealthCheckUseCase => ({
  execute: () => restRepository.healthCheck(),
});

// setSupabaseCookieUseCase
export type TSetSupabaseCookieUseCase = IUseCaseWithoutParamsAndPromiseResult<void>;

export const setSupabaseCookieUseCase = (
  restRepository: IRestRepository,
  supabaseRepository: ISupabaseRepository,
): TSetSupabaseCookieUseCase => ({
  execute: () => {
    const session = supabaseRepository.getSession();

    return restRepository.setSupabaseCookie(session);
  },
});

// getLoggedProfileUseCase
export type TGetLoggedProfileUseCase = IUseCaseWithoutParamsAndPromiseResult<IProfile>;

export const getLoggedProfileUseCase = (
  restRepository: IRestRepository,
): TGetLoggedProfileUseCase => ({
  execute: () => restRepository.getLoggedProfile(),
});

// setNotionApiTokenUseCase
export type TSetNotionApiTokenUseCase = IUseCaseWithSingleParamAndPromiseResult<string, IHash>;

export const setNotionApiTokenUseCase = (
  restRepository: IRestRepository,
): TSetNotionApiTokenUseCase => ({
  execute: (token) => restRepository.setNotionApiToken(token),
});

// getAvailableNotionDatabasesUseCase
export type TGetAvailableNotionDatabasesUseCase = IUseCaseWithoutParamsAndPromiseResult<
  INotionDatabase[]
>;

export const getAvailableNotionDatabasesUseCase = (
  restRepository: IRestRepository,
): TGetAvailableNotionDatabasesUseCase => ({
  execute: () => restRepository.getAvailableNotionDatabases(),
});

// setNotionDatabaseIdUseCase
export type TSetNotionDatabaseIdUseCase = IUseCaseWithSingleParamAndPromiseResult<string, string>;

export const setNotionDatabaseIdUseCase = (
  restRepository: IRestRepository,
): TSetNotionDatabaseIdUseCase => ({
  execute: (databaseId) => restRepository.setNotionDatabaseId(databaseId),
});

// getRandomNotionWordsUseCase
export type TGetRandomNotionWordsUseCase = IUseCaseWithoutParamsAndPromiseResult<INotionWord[]>;

export const getRandomNotionWordsUseCase = (
  restRepository: IRestRepository,
): TGetRandomNotionWordsUseCase => ({
  execute: () => restRepository.getRandomNotionWords(),
});

// sendContactFormDataUseCase
export type TSendContactFormDataUseCase = IUseCaseWithSingleParamAndPromiseResult<
  IContact,
  IContact
>;

export const sendContactFormDataUseCase = (
  restRepository: IRestRepository,
): TSendContactFormDataUseCase => ({
  execute: (data) => restRepository.sendContactFormData(data),
});

// increaseDailyStreakUseCase
export type TIncreaseDailyStreakUseCase =
  IUseCaseWithoutParamsAndPromiseResult<IIncreaseDailyStreak>;

export const increaseDailyStreakUseCase = (
  restRepository: IRestRepository,
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TIncreaseDailyStreakUseCase => ({
  execute: () => {
    speechSynthesisRepository.cancel();

    return restRepository.increaseDailyStreak();
  },
});

// resetNotionIntegrationUseCase
export type TResetNotionIntegrationUseCase = IUseCaseWithoutParamsAndPromiseResult<void>;

export const resetNotionIntegrationUseCase = (
  restRepository: IRestRepository,
): TResetNotionIntegrationUseCase => ({
  execute: () => restRepository.resetNotionIntegration(),
});

// deleteProfileUseCase
export type TDeleteProfileUseCase = IUseCaseWithoutParamsAndPromiseResult<void>;

export const deleteProfileUseCase = (
  restRepository: IRestRepository,
  supabaseRepository: ISupabaseRepository,
): TDeleteProfileUseCase => ({
  execute: async () => {
    await restRepository.deleteProfile();

    supabaseRepository.logout();
  },
});

// getDictionarySuggestionsUseCase
export type TGetDictionarySuggestionsUseCaseUseCase = IUseCaseWithSingleParamAndPromiseResult<
  string,
  IDictionarySuggestions | null
>;

export const getDictionarySuggestionsUseCase = (
  restRepository: IRestRepository,
): TGetDictionarySuggestionsUseCaseUseCase => ({
  execute: (word) => restRepository.getDictionarySuggestions(word),
});

// updateNotionWordUseCase
export type TUpdateNotionWordUseCase = IUseCaseWithSingleParamAndPromiseResult<
  IUpdateNotionWordRequest,
  string
>;

export const updateNotionWordUseCase = (
  restRepository: IRestRepository,
): TUpdateNotionWordUseCase => ({
  execute: (word) => restRepository.updateNotionWord(word),
});

// getNotionTableColumnsUseCase
export type TGetNotionTableColumnsUseCase = IUseCaseWithoutParamsAndPromiseResult<
  TNotionTableColumn[]
>;

export const getNotionTableColumnsUseCase = (
  restRepository: IRestRepository,
): TGetNotionTableColumnsUseCase => ({
  execute: () => restRepository.getNotionTableColumns(),
});

// createNotionWordUseCase
export type TCreateNotionWordUseCase = IUseCaseWithSingleParamAndPromiseResult<
  Record<string, string>,
  string
>;

export const createNotionWordUseCase = (
  restRepository: IRestRepository,
): TCreateNotionWordUseCase => ({
  execute: (word) => restRepository.createNotionWord(word),
});
