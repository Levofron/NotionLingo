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
  OnAuthStateChangeCallback,
} from './supabase.models';
import { ISupabaseRepository } from './supabase.repository';

// loginViaMagicLinkUseCase
export type LoginViaMagicLinkUseCase = IUseCaseWithSingleParamAndPromiseResult<
  string,
  IOAuthResponse
>;

export const loginViaMagicLinkUseCase = (
  supabaseRepository: ISupabaseRepository,
): LoginViaMagicLinkUseCase => ({
  execute: async (email) => {
    const response = await supabaseRepository.loginViaMagicLink(email);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response;
  },
});

// logoutUseCase
export type LogoutUseCase = IUseCaseWithoutParamsAndPromiseResult<void>;

export const logoutUseCase = (
  supabaseRepository: ISupabaseRepository,
  restRepository: IRestRepository,
): LogoutUseCase => ({
  execute: async () => {
    await supabaseRepository.logout();
    await restRepository.setSupabaseCookie(null);
  },
});

// getUserUseCase
export type GetUserUseCase = IUseCaseWithoutParams<User | null>;

export const getUserUseCase = (supabaseRepository: ISupabaseRepository): GetUserUseCase => ({
  execute: () => supabaseRepository.getUser(),
});

// getSessionUseCase
export type GetSessionUseCase = IUseCaseWithoutParams<Session | null>;

export const getSessionUseCase = (supabaseRepository: ISupabaseRepository): GetSessionUseCase => ({
  execute: () => supabaseRepository.getSession(),
});

// onAuthStateChangeUseCase
export type OnAuthStateChangeUseCase = IUseCaseWithSingleParam<
  OnAuthStateChangeCallback,
  IOnAuthStateChangeResponse
>;

export const onAuthStateChangeUseCase = (
  supabaseRepository: ISupabaseRepository,
): OnAuthStateChangeUseCase => ({
  execute: (callback) => supabaseRepository.onAuthStateChange(callback),
});
