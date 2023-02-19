import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { restModule, supabaseModule } from '@adapter/modules';

import { IProfile } from '@domain/entities/rest.types';

import { UserContext } from '@infrastructure/context';
import { ERoutes } from '@infrastructure/types/routes';
import { useAxios } from '@infrastructure/utils';

import { IUserProviderProps } from './user-provider.types';

export const UserProvider = ({ children }: IUserProviderProps): JSX.Element => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [user, setUser] = useState<(User & IProfile) | null>(null);

  const { mutateAsync: mutateAsyncGetLoggedProfile } = useAxios(restModule.getLoggedProfile);
  const { mutateAsync: mutateAsyncSetSupabaseCookie } = useAxios(restModule.setSupabaseCookie);

  const getUserProfile = async () => {
    if (user) {
      return;
    }

    setIsLoading(true);
    const sessionUser = supabaseModule.getUser();

    if (sessionUser) {
      await mutateAsyncSetSupabaseCookie();
      const response = await mutateAsyncGetLoggedProfile();

      setUser({ ...sessionUser, ...response });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getUserProfile();

    supabaseModule.onAuthStateChange(getUserProfile);
  }, []);

  const logout = async () => {
    await supabaseModule.logout();

    setUser(null);
    router.push(ERoutes.HOME);
  };

  const loginViaGoogle = async () => {
    await supabaseModule.loginViaGoogle();

    router.push(ERoutes.ONBOARDING);
  };

  const resetNotionData = () =>
    setUser((_prevUser) => ({
      ..._prevUser!,
      hasNotionData: false,
    }));

  const providerValue = {
    user,
    logout,
    isLoading,
    loginViaGoogle,
    resetNotionData,
    isUserAuthenticated: !!user,
  };

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};
