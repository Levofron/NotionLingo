import { MutableRefObject } from 'react';

import { ActiveTabs } from '@presentation/molecules';

export interface OnboardingProps {
  activeTabs: ActiveTabs;
  createNotionIntegrationTabRef: MutableRefObject<HTMLButtonElement | null>;
  displayCreateNotionIntegrationTab: () => void;
  displaySelectNotionDatabaseTab: () => void;
  displayShareDatabaseIntegrationTab: () => void;
  displayValidateIntegrationTab: () => void;
  displayVerifyDatabaseTab: () => void;
  selectNotionDatabaseTabRef: MutableRefObject<HTMLButtonElement | null>;
  shareDatabaseIntegrationTabRef: MutableRefObject<HTMLButtonElement | null>;
  validateIntegrationTabRef: MutableRefObject<HTMLButtonElement | null>;
  verifyDatabaseTabRef: MutableRefObject<HTMLButtonElement | null>;
}
