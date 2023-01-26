import {
  IUseCaseWithSingleParamAndPromiseResult,
  IUseCaseWithoutParamsAndPromiseResult,
} from '../common.types';
import {
  IContact,
  IHash,
  IIncreaseDailyStreak,
  INotionPage,
  INotionWord,
  IUser,
} from './rest.models';
import { IRestRepository } from './rest.repository';

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

// getLoggedUserUseCase
export type TGetLoggedUserUseCase = IUseCaseWithoutParamsAndPromiseResult<IUser>;

export const getLoggedUserUseCase = (restRepository: IRestRepository): TGetLoggedUserUseCase => ({
  execute: () => restRepository.getLoggedUser(),
});

// setNotionApiTokenUseCase
export type TSetNotionApiTokenUseCase = IUseCaseWithSingleParamAndPromiseResult<string, IHash>;

export const setNotionApiTokenUseCase = (
  restRepository: IRestRepository,
): TSetNotionApiTokenUseCase => ({
  execute: (token) => restRepository.setNotionApiToken(token),
});

// getAvailableNotionPagesUseCase
export type TGetAvailableNotionPagesUseCase = IUseCaseWithoutParamsAndPromiseResult<INotionPage[]>;

export const getAvailableNotionPagesUseCase = (
  restRepository: IRestRepository,
): TGetAvailableNotionPagesUseCase => ({
  execute: () => restRepository.getAvailableNotionPages(),
});

// setNotionPageIdUseCase
export type TSetNotionPageIdUseCase = IUseCaseWithSingleParamAndPromiseResult<string, string>;

export const setNotionPageIdUseCase = (
  restRepository: IRestRepository,
): TSetNotionPageIdUseCase => ({
  execute: (pageId) => restRepository.setNotionPageId(pageId),
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
