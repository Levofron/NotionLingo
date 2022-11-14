export interface IAuthorizationRepository {
  loginViaGoogle: () => Promise<void>;
}
