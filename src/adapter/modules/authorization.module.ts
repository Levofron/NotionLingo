import { loginViaGoogleUseCase, logoutUseCase } from '@domain/authorization/authorization.use-case';
import { supabaseInstance } from '@infrastructure';
import { getAuthorizationSource } from '@data/sources/authorization/authorization.source';
import { getAuthorizationRepository } from '@data/repositories/authorization.repository';

// sources
const authorizationSource = getAuthorizationSource(supabaseInstance);

// repositories
const authorizationRepository = getAuthorizationRepository(authorizationSource);

export const authorizationModule = {
  logout: logoutUseCase(authorizationRepository).execute,
  loginViaGoogle: loginViaGoogleUseCase(authorizationRepository).execute,
};
