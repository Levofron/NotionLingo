import { IRestRepository } from './rest.repository';

import { IUseCase } from '../common.types';
import { AxiosResponse } from 'axios';
import { IUser, IHash, INotionWord } from './rest.models';

// healthCheckUseCase
export type THealthCheckUseCase = IUseCase<void, AxiosResponse<string>>;

export const healthCheckUseCase = (restRepository: IRestRepository): THealthCheckUseCase => ({
  execute: () => restRepository.healthCheck(),
});

// setSupabaseCookieUseCase
export type TSetSupabaseCookieUseCase = IUseCase<void, void>;

export const setSupabaseCookieUseCase = (
  restRepository: IRestRepository,
): TSetSupabaseCookieUseCase => ({
  execute: () => restRepository.setSupabaseCookie(),
});

// getLoggedUserUseCase
export type TGetLoggedUserUseCase = IUseCase<void, AxiosResponse<IUser>>;

export const getLoggedUserUseCase = (restRepository: IRestRepository): TGetLoggedUserUseCase => ({
  execute: () => restRepository.getLoggedUser(),
});

// setNotionApiTokenUseCase
export type TSetNotionApiTokenUseCase = IUseCase<{ token: string }, AxiosResponse<IHash>>;

export const setNotionApiTokenUseCase = (
  restRepository: IRestRepository,
): TSetNotionApiTokenUseCase => ({
  execute: ({ token }) => restRepository.setNotionApiToken(token),
});

// getAvailableNotionPagesUseCase
export type TGetAvailableNotionPagesUseCase = IUseCase<void, AxiosResponse<void>>;

export const getAvailableNotionPagesUseCase = (
  restRepository: IRestRepository,
): TGetAvailableNotionPagesUseCase => ({
  execute: () => restRepository.getAvailableNotionPages(),
});

// setNotionPageIdUseCase
export type TSetNotionPageIdUseCase = IUseCase<{ pageId: string }, AxiosResponse<void>>;

export const setNotionPageIdUseCase = (
  restRepository: IRestRepository,
): TSetNotionPageIdUseCase => ({
  execute: ({ pageId }) => restRepository.setNotionPageId(pageId),
});

// getRandomNotionWordsUseCase
export type TGetRandomNotionWordsUseCase = IUseCase<void, AxiosResponse<INotionWord>>;

export const getRandomNotionWordsUseCase = (
  restRepository: IRestRepository,
): TGetRandomNotionWordsUseCase => ({
  execute: () => restRepository.getRandomNotionWords(),
});
