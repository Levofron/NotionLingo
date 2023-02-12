import { Session, User } from '@supabase/supabase-js';

import {
  ILogoutResponse,
  IOAuthResponse,
  IOnAuthStateChangeResponse,
  TOnAuthStateChangeCallback,
} from '../entities/supabase.types';
import { ISupabaseRepository } from '../repositories/supabase.repository';
import {
  IUseCaseWithSingleParam,
  IUseCaseWithoutParams,
  IUseCaseWithoutParamsAndPromiseResult,
} from './common.types';

// loginViaGoogleUseCase
export type TLoginViaGoogleUseCase = IUseCaseWithoutParamsAndPromiseResult<IOAuthResponse>;

export const loginViaGoogleUseCase = (
  supabaseRepository: ISupabaseRepository,
): TLoginViaGoogleUseCase => ({
  execute: () => supabaseRepository.loginViaGoogle(),
});

// logoutUseCase
export type TLogoutUseCase = IUseCaseWithoutParamsAndPromiseResult<ILogoutResponse>;

export const logoutUseCase = (supabaseRepository: ISupabaseRepository): TLogoutUseCase => ({
  execute: () => supabaseRepository.logout(),
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
