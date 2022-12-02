import { IRestRepository } from './rest.repository';

import { IUseCase } from '../common.types';
import { AxiosResponse } from 'axios';
import { IUser, IHash } from './rest.models';

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
