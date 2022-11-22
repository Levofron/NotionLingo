import { ISupabaseRepository } from './supabase.repository';

import { IUseCase } from '../common.types';
import { TOAuthResponse, ILogoutResponse, TUserResponse, TSessionResponse } from './supabase.types';

// loginViaGoogleUseCase
export type TLoginViaGoogleUseCase = IUseCase<void, TOAuthResponse>;

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
export type TGetUserUseCase = IUseCase<void, TUserResponse>;

export const getUserUseCase = (supabaseRepository: ISupabaseRepository): TGetUserUseCase => ({
  execute: () => supabaseRepository.getUser(),
});

// getSessionUseCase
export type TGetSessionUseCase = IUseCase<void, TSessionResponse>;

export const getSessionUseCase = (supabaseRepository: ISupabaseRepository): TGetSessionUseCase => ({
  execute: () => supabaseRepository.getSession(),
});
