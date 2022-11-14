import { IAuthorizationRepository } from './authorization.repository';

import { IUseCase } from '../common.types';

export type LoginViaGoogleUseCase = IUseCase<void, void>;

export const loginViaGoogleUseCase = (
  authorizationRepository: IAuthorizationRepository,
): LoginViaGoogleUseCase => ({
  execute: (): Promise<void> => authorizationRepository.loginViaGoogle(),
});
