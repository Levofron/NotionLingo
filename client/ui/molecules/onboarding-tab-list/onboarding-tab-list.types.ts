import { RefObject } from 'react';

export interface IActiveTabs {
  createNotionIntegration: boolean;
  selectNotionDatabase: boolean;
  shareDatabaseIntegration: boolean;
  validateIntegration: boolean;
  verifyDatabase: boolean;
}

export interface IOnboardingTabListProps {
  activeTabs: IActiveTabs;
  createNotionIntegrationTabRef: RefObject<HTMLButtonElement>;
  selectNotionDatabaseTabRef: RefObject<HTMLButtonElement>;
  shareDatabaseIntegrationTabRef: RefObject<HTMLButtonElement>;
  validateIntegrationTabRef: RefObject<HTMLButtonElement>;
  verifyDatabaseTabRef: RefObject<HTMLButtonElement>;
}
