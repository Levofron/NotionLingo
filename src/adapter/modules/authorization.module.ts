import { loginViaGoogleUseCase, logoutUseCase } from '@domain/authorization/authorization.use-case';
import { getAuthorizationRepository } from '@data/authorization/authorization.repository';
import { supabaseInstance } from '@infrastructure';

const authorizationRepository = getAuthorizationRepository(supabaseInstance);

export const authorizationModule = {
  logout: logoutUseCase(authorizationRepository).execute,
  loginViaGoogle: loginViaGoogleUseCase(authorizationRepository).execute,
};
