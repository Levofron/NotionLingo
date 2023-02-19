import { useEffect } from 'react';

import { SEO } from '@ui/atoms';
import { FullScreenLoader } from '@ui/molecules';
import { OnboardingTemplate } from '@ui/templates';

import { useRouter, useUser } from '@infrastructure/utils';

export const OnboardingPage = (): JSX.Element => {
  const { isOnboarding, redirectToDashboard, redirectToHome } = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (isLoading === undefined || (isLoading && isOnboarding)) {
      return;
    }

    if (!user && !isLoading) {
      redirectToHome();

      return;
    }

    if (user?.hasNotionData === true) {
      redirectToDashboard();
    }
  }, [user, isLoading, isOnboarding]);

  return (
    <>
      <SEO noFollow noIndex title="Onboarding" />
      {!user || user.hasNotionData === true ? <FullScreenLoader /> : <OnboardingTemplate />}
    </>
  );
};
