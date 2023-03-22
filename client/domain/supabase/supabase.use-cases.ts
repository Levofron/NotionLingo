import { Session, User } from '@supabase/supabase-js';

import { IRestRepository } from '../rest/rest.repository';
import {
  IUseCaseWithSingleParam,
  IUseCaseWithSingleParamAndPromiseResult,
  IUseCaseWithoutParams,
  IUseCaseWithoutParamsAndPromiseResult,
} from '../use-cases.types';
import {
  IOAuthResponse,
  IOnAuthStateChangeResponse,
  TOnAuthStateChangeCallback,
} from './supabase.entities';
import { ISupabaseRepository } from './supabase.repository';

// loginViaMagicLinkUseCase
export type TLoginViaMagicLinkUseCase = IUseCaseWithSingleParamAndPromiseResult<
  string,
  IOAuthResponse
>;

export const loginViaMagicLinkUseCase = (
  supabaseRepository: ISupabaseRepository,
): TLoginViaMagicLinkUseCase => ({
  execute: async (email) => {
    const response = await supabaseRepository.loginViaMagicLink(email);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response;
  },
});

// logoutUseCase
export type TLogoutUseCase = IUseCaseWithoutParamsAndPromiseResult<void>;

export const logoutUseCase = (
  supabaseRepository: ISupabaseRepository,
  restRepository: IRestRepository,
): TLogoutUseCase => ({
  execute: async () => {
    await supabaseRepository.logout();
    await restRepository.setSupabaseCookie(null);
  },
});

// getUserUseCase
export type TGetUserUseCase = IUseCaseWithoutParams<User | null>;

export const getUserUseCase = (supabaseRepository: ISupabaseRepository): TGetUserUseCase => ({
  execute: () => supabaseRepository.getUser(),
});

// getSessionUseCase
export type TGetSessionUseCase = IUseCaseWithoutParams<Session | null>;

export const getSessionUseCase = (supabaseRepository: ISupabaseRepository): TGetSessionUseCase => ({
  execute: () => supabaseRepository.getSession(),
});

// onAuthStateChangeUseCase
export type TOnAuthStateChangeUseCase = IUseCaseWithSingleParam<
  TOnAuthStateChangeCallback,
  IOnAuthStateChangeResponse
>;

export const onAuthStateChangeUseCase = (
  supabaseRepository: ISupabaseRepository,
): TOnAuthStateChangeUseCase => ({
  execute: (callback) => supabaseRepository.onAuthStateChange(callback),
});
