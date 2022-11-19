import { TOAuthResponse, ILogoutResponse } from '@domain/authorization/authorization.types';

export interface IAuthorizationSource {
  loginViaGoogle: () => Promise<TOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
