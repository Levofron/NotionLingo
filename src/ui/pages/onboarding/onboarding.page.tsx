import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { FullScreenLoader } from '@ui/molecules';
import { OnboardingTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

export const OnboardingPage = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && user?.hasNotionData === true) {
      router.push(ERoutes.DASHBOARD);
    }
  }, [user, isLoading]);

  return (
    <>
      <Head>
        <title>Levofron</title>
      </Head>
      {isLoading && !user ? <FullScreenLoader /> : <OnboardingTemplate />}
    </>
  );
};
