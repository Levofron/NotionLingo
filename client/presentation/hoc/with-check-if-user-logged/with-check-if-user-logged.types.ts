import { Routes } from '@shared/routes';

export interface WithCheckIfUserLoggedOptions {
  currentPageUrl: Routes;
  redirectUrlOnError: Routes;
  shouldHaveNotionData: boolean;
}
