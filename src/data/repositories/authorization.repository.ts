import { IAuthorizationSource } from '../sources/authorization/authorization.types';
import { IAuthorizationRepository } from '@domain/authorization/authorization.repository';

export const getAuthorizationRepository = (
  authorizationSource: IAuthorizationSource,
): IAuthorizationRepository => ({
  loginViaGoogle: () => authorizationSource.loginViaGoogle(),
  logout: () => authorizationSource.logout(),
});
