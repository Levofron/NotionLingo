import { IAuthorizationRepository } from './authorization.repository';

import { IUseCase } from '../common.types';
import { OAuthResponse } from '@supabase/supabase-js';

export type LoginViaGoogleUseCase = IUseCase<void, OAuthResponse>;

export const loginViaGoogleUseCase = (
  authorizationRepository: IAuthorizationRepository,
): LoginViaGoogleUseCase => ({
  execute: (): Promise<OAuthResponse> => authorizationRepository.loginViaGoogle(),
});
