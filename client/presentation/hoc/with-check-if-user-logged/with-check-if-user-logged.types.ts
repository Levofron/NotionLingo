import { ERoutes } from '@infrastructure/routes';

export interface IWithCheckIfUserLoggedOptions {
  redirectUrlOnError: ERoutes;
  shouldHaveNotionData: boolean;
}
