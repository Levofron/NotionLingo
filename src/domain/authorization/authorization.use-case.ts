import { IAuthorizationRepository } from './authorization.repository';

import { IUseCase } from '../common.types';
import { TOAuthResponse, ILogoutResponse } from './authorization.types';

// loginViaGoogleUseCase
export type TLoginViaGoogleUseCase = IUseCase<void, TOAuthResponse>;

export const loginViaGoogleUseCase = (
  authorizationRepository: IAuthorizationRepository,
): TLoginViaGoogleUseCase => ({
  execute: () => authorizationRepository.loginViaGoogle(),
});

// logoutUseCase
export type TLogoutUseCase = IUseCase<void, ILogoutResponse>;

export const logoutUseCase = (
  authorizationRepository: IAuthorizationRepository,
): TLogoutUseCase => ({
  execute: () => authorizationRepository.logout(),
});
