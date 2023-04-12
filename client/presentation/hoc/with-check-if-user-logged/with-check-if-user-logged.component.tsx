import { ComponentType, useEffect } from 'react';

import { FullScreenLoader } from '@presentation/molecules';

import { useRouter, useUser } from '@shared/hooks';

import { IWithCheckIfUserLoggedOptions } from './with-check-if-user-logged.types';

export const withCheckIfUserLogged = (
  WrappedComponent: ComponentType,
  { currentPageUrl, redirectUrlOnError, shouldHaveNotionData }: IWithCheckIfUserLoggedOptions,
) => {
  const CheckIfUserLogged = () => {
    const { isLoading, user } = useUser();
    const { isSamePath, redirectTo, redirectToHome } = useRouter();

    useEffect(() => {
      if (isLoading === undefined || (isLoading && isSamePath(currentPageUrl))) {
        return;
      }

      if (!user) {
        redirectToHome();

        return;
      }

      if (user.hasNotionData !== shouldHaveNotionData) {
        redirectTo(redirectUrlOnError);
      }
    }, [user, isLoading, isSamePath, redirectTo]);

    return !user || user.hasNotionData !== shouldHaveNotionData ? (
      <FullScreenLoader />
    ) : (
      <WrappedComponent />
    );
  };

  return CheckIfUserLogged;
};
