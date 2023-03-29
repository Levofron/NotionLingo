import { ERoutes } from '@infrastructure/routes';

export interface IWithCheckIfUserLoggedOptions {
  currentPageUrl: ERoutes;
  redirectUrlOnError: ERoutes;
  shouldHaveNotionData: boolean;
}
