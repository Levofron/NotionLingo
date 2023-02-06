import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SEO } from '@ui/atoms';
import { FullScreenLoader } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { DonateTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

export const DonatePage = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (isLoading || router.pathname === ERoutes.DONATE) {
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
      <SEO noFollow noIndex title="Donate" />
      <SidebarWithHeader />
      {!user || user.hasNotionData === false || isLoading ? (
        <FullScreenLoader />
      ) : (
        <DonateTemplate />
      )}
    </>
  );
};
