import { RefObject } from 'react';

export interface ActiveTabs {
  createNotionIntegration: boolean;
  selectNotionDatabase: boolean;
  shareDatabaseIntegration: boolean;
  validateIntegration: boolean;
  verifyDatabase: boolean;
}

export interface OnboardingTabListProps {
  activeTabs: ActiveTabs;
  createNotionIntegrationTabRef: RefObject<HTMLButtonElement>;
  selectNotionDatabaseTabRef: RefObject<HTMLButtonElement>;
  shareDatabaseIntegrationTabRef: RefObject<HTMLButtonElement>;
  validateIntegrationTabRef: RefObject<HTMLButtonElement>;
  verifyDatabaseTabRef: RefObject<HTMLButtonElement>;
}
