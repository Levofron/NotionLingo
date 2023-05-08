import { useRef, useState } from 'react';

import { withCheckIfUserLogged } from '@presentation/hoc';
import { ActiveTabs } from '@presentation/molecules';
import { Onboarding as OnboardingTemplate } from '@presentation/templates';

import { Routes } from '@shared/routes';

const OnboardingComponent = () => {
  const verifyDatabaseTabRef = useRef<HTMLButtonElement | null>(null);
  const validateIntegrationTabRef = useRef<HTMLButtonElement | null>(null);
  const selectNotionDatabaseTabRef = useRef<HTMLButtonElement | null>(null);
  const createNotionIntegrationTabRef = useRef<HTMLButtonElement | null>(null);
  const shareDatabaseIntegrationTabRef = useRef<HTMLButtonElement | null>(null);

  const [activeTabs, setActiveTabs] = useState<ActiveTabs>({
    verifyDatabase: true,
    createNotionIntegration: false,
    shareDatabaseIntegration: false,
    validateIntegration: false,
    selectNotionDatabase: false,
  });

  const displayVerifyDatabaseTab = () => {
    verifyDatabaseTabRef.current?.click();

    setActiveTabs({
      verifyDatabase: true,
      createNotionIntegration: false,
      shareDatabaseIntegration: false,
      validateIntegration: false,
      selectNotionDatabase: false,
    });
  };

  const displayCreateNotionIntegrationTab = () => {
    createNotionIntegrationTabRef.current?.click();

    setActiveTabs({
      verifyDatabase: true,
      createNotionIntegration: true,
      shareDatabaseIntegration: false,
      validateIntegration: false,
      selectNotionDatabase: false,
    });
  };

  const displayShareDatabaseIntegrationTab = () => {
    shareDatabaseIntegrationTabRef.current?.click();

    setActiveTabs({
      verifyDatabase: true,
      createNotionIntegration: true,
      shareDatabaseIntegration: true,
      validateIntegration: false,
      selectNotionDatabase: false,
    });
  };

  const displayValidateIntegrationTab = () => {
    validateIntegrationTabRef.current?.click();

    setActiveTabs({
      verifyDatabase: true,
      createNotionIntegration: true,
      shareDatabaseIntegration: true,
      validateIntegration: true,
      selectNotionDatabase: false,
    });
  };

  const displaySelectNotionDatabaseTab = () => {
    selectNotionDatabaseTabRef.current?.click();

    setActiveTabs({
      verifyDatabase: true,
      createNotionIntegration: true,
      shareDatabaseIntegration: true,
      validateIntegration: true,
      selectNotionDatabase: true,
    });
  };

  return (
    <OnboardingTemplate
      activeTabs={activeTabs}
      createNotionIntegrationTabRef={createNotionIntegrationTabRef}
      displayCreateNotionIntegrationTab={displayCreateNotionIntegrationTab}
      displaySelectNotionDatabaseTab={displaySelectNotionDatabaseTab}
      displayShareDatabaseIntegrationTab={displayShareDatabaseIntegrationTab}
      displayValidateIntegrationTab={displayValidateIntegrationTab}
      displayVerifyDatabaseTab={displayVerifyDatabaseTab}
      selectNotionDatabaseTabRef={selectNotionDatabaseTabRef}
      shareDatabaseIntegrationTabRef={shareDatabaseIntegrationTabRef}
      validateIntegrationTabRef={validateIntegrationTabRef}
      verifyDatabaseTabRef={verifyDatabaseTabRef}
    />
  );
};

export const Onboarding = withCheckIfUserLogged(OnboardingComponent, {
  currentPageUrl: Routes.ONBOARDING,
  redirectUrlOnError: Routes.DASHBOARD,
  shouldHaveNotionData: false,
});
