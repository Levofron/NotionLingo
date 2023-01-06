import { RefObject } from 'react';

export interface IActiveTabs {
  createNotionIntegration: boolean;
  selectNotionPage: boolean;
  shareDatabaseIntegration: boolean;
  validateIntegration: boolean;
}

export interface IOnboardingTabListProps {
  activeTabs: IActiveTabs;
  createNotionIntegrationTabRef: RefObject<HTMLButtonElement>;
  selectNotionPageTabRef: RefObject<HTMLButtonElement>;
  shareDatabaseIntegrationTabRef: RefObject<HTMLButtonElement>;
  validateIntegrationTabRef: RefObject<HTMLButtonElement>;
}
