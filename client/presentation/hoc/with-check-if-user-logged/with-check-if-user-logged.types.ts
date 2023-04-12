import { ERoutes } from '@shared/routes';

export interface IWithCheckIfUserLoggedOptions {
  currentPageUrl: ERoutes;
  redirectUrlOnError: ERoutes;
  shouldHaveNotionData: boolean;
}
