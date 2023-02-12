import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SEO } from '@ui/atoms';
import { FullScreenLoader } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { DashboardTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

export const DashboardPage = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (isLoading === undefined || (isLoading && router.pathname === ERoutes.DASHBOARD)) {
      return;
    }

    if (!user) {
      router.push(ERoutes.HOME);

      return;
    }

    if (user.hasNotionData === false) {
      router.push(ERoutes.ONBOARDING);
    }
  }, [user, isLoading]);

  return (
    <>
      <SEO noFollow noIndex title="Account Settings" />
      <SidebarWithHeader />
      {!user || user.hasNotionData === false ? <FullScreenLoader /> : <DashboardTemplate />}
    </>
  );
};
