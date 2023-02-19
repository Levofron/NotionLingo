import { useEffect } from 'react';

import { SEO } from '@ui/atoms';
import { FullScreenLoader } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { AccountSettingsTemplate } from '@ui/templates';

import { useRouter, useUser } from '@infrastructure/utils';

export const AccountSettingsPage = (): JSX.Element => {
  const { isLoading, user } = useUser();
  const { redirectToOnboarding } = useRouter();

  useEffect(() => {
    if (!isLoading && user?.hasNotionData === false) {
      redirectToOnboarding();
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
