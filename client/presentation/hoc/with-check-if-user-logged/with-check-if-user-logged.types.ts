import { Routes } from '@shared/routes';

export interface IWithCheckIfUserLoggedOptions {
  currentPageUrl: Routes;
  redirectUrlOnError: Routes;
  shouldHaveNotionData: boolean;
}
