import { ERoutes } from '@infrastructure/types/routes';

export interface IWithCheckIfUserLoggedOptions {
  currentPageUrl: ERoutes;
  redirectUrlOnError: ERoutes;
  shouldHaveNotionData: boolean;
}
