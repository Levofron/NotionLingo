import { useEffect } from 'react';

import { SEO } from '@ui/atoms';
import { FullScreenLoader } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';
import { DonateTemplate } from '@ui/templates';

import { useRouter, useUser } from '@infrastructure/utils';

export const DonatePage = (): JSX.Element => {
  const { isDonate, redirectToHome, redirectToOnboarding } = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (isLoading === undefined || (isLoading && isDonate)) {
      return;
    }

    if (!user) {
      redirectToHome();

      return;
    }

    if (user.hasNotionData === false) {
      redirectToOnboarding();
    }
  }, [user, isLoading, isDonate]);

  return (
    <>
      <SEO noFollow noIndex title="Donate" />
      <SidebarWithHeader />
      {!user || user.hasNotionData === false ? <FullScreenLoader /> : <DonateTemplate />}
    </>
  );
};
