import { Session, User } from '@supabase/supabase-js';

import { RestRepository } from '../rest/rest.repository';
import {
  UseCaseWithSingleParam,
  UseCaseWithSingleParamAndPromiseResult,
  UseCaseWithoutParams,
  UseCaseWithoutParamsAndPromiseResult,
} from '../use-cases.types';
import {
  OAuthResponse,
  OnAuthStateChangeCallback,
  OnAuthStateChangeResponse,
} from './supabase.models';
import { SupabaseRepository } from './supabase.repository';

// loginViaMagicLinkUseCase
export type LoginViaMagicLinkUseCase = UseCaseWithSingleParamAndPromiseResult<
  string,
  OAuthResponse
>;

export const loginViaMagicLinkUseCase = (
  supabaseRepository: SupabaseRepository,
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
export type LogoutUseCase = UseCaseWithoutParamsAndPromiseResult<void>;

export const logoutUseCase = (
  supabaseRepository: SupabaseRepository,
  restRepository: RestRepository,
): LogoutUseCase => ({
  execute: async () => {
    await supabaseRepository.logout();
    await restRepository.setSupabaseCookie(null);
  },
});

// getUserUseCase
export type GetUserUseCase = UseCaseWithoutParams<User | null>;

export const getUserUseCase = (supabaseRepository: SupabaseRepository): GetUserUseCase => ({
  execute: () => supabaseRepository.getUser(),
});

// getSessionUseCase
export type GetSessionUseCase = UseCaseWithoutParams<Session | null>;

export const getSessionUseCase = (supabaseRepository: SupabaseRepository): GetSessionUseCase => ({
  execute: () => supabaseRepository.getSession(),
});

// onAuthStateChangeUseCase
export type OnAuthStateChangeUseCase = UseCaseWithSingleParam<
  OnAuthStateChangeCallback,
  OnAuthStateChangeResponse
>;

export const onAuthStateChangeUseCase = (
  supabaseRepository: SupabaseRepository,
): OnAuthStateChangeUseCase => ({
  execute: (callback) => supabaseRepository.onAuthStateChange(callback),
});
