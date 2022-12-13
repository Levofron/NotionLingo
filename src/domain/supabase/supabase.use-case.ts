import { IUseCase } from '../common.types';
import { ISupabaseRepository } from './supabase.repository';
import {
  ILogoutResponse,
  IOAuthResponse,
  IOnAuthStateChangeResponse,
  TOnAuthStateChangeCallback,
  TSession,
  TUser,
} from './supabase.types';

// loginViaGoogleUseCase
export type TLoginViaGoogleUseCase = IUseCase<void, IOAuthResponse>;

export const loginViaGoogleUseCase = (
  supabaseRepository: ISupabaseRepository,
): TLoginViaGoogleUseCase => ({
  execute: () => supabaseRepository.loginViaGoogle(),
});

// logoutUseCase
export type TLogoutUseCase = IUseCase<void, ILogoutResponse>;

export const logoutUseCase = (supabaseRepository: ISupabaseRepository): TLogoutUseCase => ({
  execute: () => supabaseRepository.logout(),
});

// getUserUseCase
export type TGetUserUseCase = IUseCase<void, TUser | null>;

export const getUserUseCase = (supabaseRepository: ISupabaseRepository): TGetUserUseCase => ({
  execute: () => supabaseRepository.getUser(),
});

// getSessionUseCase
export type TGetSessionUseCase = IUseCase<void, TSession | null>;

export const getSessionUseCase = (supabaseRepository: ISupabaseRepository): TGetSessionUseCase => ({
  execute: () => supabaseRepository.getSession(),
});

// onAuthStateChangeUseCase
export type TOnAuthStateChangeUseCase = IUseCase<
  { callback: TOnAuthStateChangeCallback },
  IOnAuthStateChangeResponse
>;

export const onAuthStateChangeUseCase = (
  supabaseRepository: ISupabaseRepository,
): TOnAuthStateChangeUseCase => ({
  execute: ({ callback }) => supabaseRepository.onAuthStateChange(callback),
});
