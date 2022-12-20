import { AxiosResponse } from 'axios';

import {
  IUseCaseWithSingleParamAndPromiseResult,
  IUseCaseWithoutParamsAndPromiseResult,
} from '../common.types';
import { IHash, INotionPage, INotionWord, IUser } from './rest.models';
import { IRestRepository } from './rest.repository';

// healthCheckUseCase
export type THealthCheckUseCase = IUseCaseWithoutParamsAndPromiseResult<AxiosResponse<string>>;

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
export type TGetLoggedUserUseCase = IUseCaseWithoutParamsAndPromiseResult<AxiosResponse<IUser>>;

export const getLoggedUserUseCase = (restRepository: IRestRepository): TGetLoggedUserUseCase => ({
  execute: () => restRepository.getLoggedUser(),
});

// setNotionApiTokenUseCase
export type TSetNotionApiTokenUseCase = IUseCaseWithSingleParamAndPromiseResult<
  string,
  AxiosResponse<IHash>
>;

export const setNotionApiTokenUseCase = (
  restRepository: IRestRepository,
): TSetNotionApiTokenUseCase => ({
  execute: (token) => restRepository.setNotionApiToken(token),
});

// getAvailableNotionPagesUseCase
export type TGetAvailableNotionPagesUseCase = IUseCaseWithoutParamsAndPromiseResult<
  AxiosResponse<INotionPage[]>
>;

export const getAvailableNotionPagesUseCase = (
  restRepository: IRestRepository,
): TGetAvailableNotionPagesUseCase => ({
  execute: () => restRepository.getAvailableNotionPages(),
});

// setNotionPageIdUseCase
export type TSetNotionPageIdUseCase = IUseCaseWithSingleParamAndPromiseResult<
  string,
  AxiosResponse<string>
>;

export const setNotionPageIdUseCase = (
  restRepository: IRestRepository,
): TSetNotionPageIdUseCase => ({
  execute: (pageId) => restRepository.setNotionPageId(pageId),
});

// getRandomNotionWordsUseCase
export type TGetRandomNotionWordsUseCase = IUseCaseWithoutParamsAndPromiseResult<
  AxiosResponse<INotionWord[]>
>;

export const getRandomNotionWordsUseCase = (
  restRepository: IRestRepository,
): TGetRandomNotionWordsUseCase => ({
  execute: () => restRepository.getRandomNotionWords(),
});
