import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { FullScreenLoader } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { DashboardTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

export const DashboardPage: FC = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && user?.hasNotionData === false) {
      router.push(ERoutes.ONBOARDING);
    }
  }, [user, isLoading]);

  return (
    <>
      <Head>
        <title>Levofron</title>
      </Head>
      <SidebarWithHeader />
      {isLoading && !user ? <FullScreenLoader /> : <DashboardTemplate />}
    </>
  );
};
