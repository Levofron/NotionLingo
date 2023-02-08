import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SEO } from '@ui/atoms';
import { FullScreenLoader } from '@ui/molecules';
import { OnboardingTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

export const OnboardingPage = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (isLoading === undefined || (isLoading && router.pathname === ERoutes.ONBOARDING)) {
      return;
    }

    if (!user && !isLoading) {
      router.push(ERoutes.HOME);

      return;
    }

    if (user?.hasNotionData === true) {
      router.push(ERoutes.DASHBOARD);
    }
  }, [user, isLoading]);

  return (
    <>
      <SEO noFollow noIndex title="Onboarding" />
      {!user || user.hasNotionData === true ? (
        <FullScreenLoader />
      ) : (
        <OnboardingTemplate />
      )}
    </>
  );
};
