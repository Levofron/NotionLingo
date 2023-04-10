import { ComponentType, useEffect } from 'react';

import { FullScreenLoader } from '@presentation/molecules';

import { useRouter, useUser } from '@infrastructure/hooks';

import { IWithCheckIfUserLoggedOptions } from './with-check-if-user-logged.types';

export const withCheckIfUserLogged = (
  WrappedComponent: ComponentType,
  { redirectUrlOnError, shouldHaveNotionData }: IWithCheckIfUserLoggedOptions,
) => {
  const CheckIfUserLogged = () => {
    const { hasSessionUser, user } = useUser();
    const { isSamePath, redirectTo, redirectToHome } = useRouter();

    useEffect(() => {
      if (!hasSessionUser || !user) {
        redirectToHome();

        return;
      }

      if (user.hasNotionData !== shouldHaveNotionData) {
        redirectTo(redirectUrlOnError);
      }
    }, [user, hasSessionUser, isSamePath, redirectTo]);

    return !hasSessionUser || !user || user?.hasNotionData !== shouldHaveNotionData ? (
      <FullScreenLoader />
    ) : (
      <WrappedComponent />
    );
  };

  return CheckIfUserLogged;
};
