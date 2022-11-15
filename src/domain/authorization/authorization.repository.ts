import { TOAuthResponse, ILogoutResponse } from './authorization.types';

export interface IAuthorizationRepository {
  loginViaGoogle: () => Promise<TOAuthResponse>;
  logout: () => Promise<ILogoutResponse>;
}
