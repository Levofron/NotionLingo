import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SEO } from '@ui/atoms';
import { FullScreenLoader } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { AccountSettingsTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

export const AccountSettingsPage = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && user?.hasNotionData === false) {
      router.push(ERoutes.ONBOARDING);
    }
  }, [user, isLoading]);

  return (
    <>
      <SEO noFollow noIndex title="Account Settings" />
      <SidebarWithHeader />
      {isLoading && !user ? <FullScreenLoader /> : <AccountSettingsTemplate />}
    </>
  );
};
