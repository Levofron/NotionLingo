import {
  IContact,
  IHash,
  IIncreaseDailyStreak,
  INotionDatabase,
  INotionWord,
  IProfile,
  IUpdateNotionWordRequest,
  IWordSuggestions,
  TNotionTableColumn,
} from '../entities/rest.types';
import { IRestRepository } from '../repositories/rest.repository';
import {
  IUseCaseWithSingleParamAndPromiseResult,
  IUseCaseWithoutParamsAndPromiseResult,
} from './common.types';

// healthCheckUseCase
export type THealthCheckUseCase = IUseCaseWithoutParamsAndPromiseResult<string>;

export const healthCheckUseCase = (restRepository: IRestRepository): THealthCheckUseCase => ({
  execute: () => restRepository.healthCheck(),
});

// setSupabaseCookieUseCase
export type TSetSupabaseCookieUseCase = IUseCaseWithoutParamsAndPromiseResult<void>;

export const setSupabaseCookieUseCase = (
  restRepository: IRestRepository,
): TSetSupabaseCookieUseCase => ({
  execute: () => restRepository.setSupabaseCookie(),
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
): TIncreaseDailyStreakUseCase => ({
  execute: () => restRepository.increaseDailyStreak(),
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

export const deleteProfileUseCase = (restRepository: IRestRepository): TDeleteProfileUseCase => ({
  execute: () => restRepository.deleteProfile(),
});

// getWordSuggestionsUseCase
export type TGetWordSuggestionsUseCase = IUseCaseWithSingleParamAndPromiseResult<
  string,
  IWordSuggestions
>;

export const getWordSuggestionsUseCase = (
  restRepository: IRestRepository,
): TGetWordSuggestionsUseCase => ({
  execute: (word) => restRepository.getWordSuggestions(word),
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