import { useEffect } from 'react';

import { SEO } from '@ui/atoms';
import { FullScreenLoader } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { DashboardTemplate } from '@ui/templates';

import { useRouter, useUser } from '@infrastructure/utils';

export const DashboardPage = (): JSX.Element => {
  const { isLoading, user } = useUser();
  const { isDashboard, redirectToHome, redirectToOnboarding } = useRouter();

  useEffect(() => {
    if (isLoading === undefined || (isLoading && isDashboard)) {
      return;
    }

    if (!user) {
      redirectToHome();

      return;
    }

    if (user.hasNotionData === false) {
      redirectToOnboarding();
    }
  }, [user, isLoading, isDashboard]);

  return (
    <>
      <SEO noFollow noIndex title="Account Settings" />
      <SidebarWithHeader />
      {!user || user.hasNotionData === false ? <FullScreenLoader /> : <DashboardTemplate />}
    </>
  );
};
