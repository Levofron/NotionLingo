import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { useLoggedProfile, useSetSupabaseCookie } from '@adapter/hooks';
import { supabaseModule } from '@adapter/modules';

import { IProfile } from '@domain/entities/rest.types';

import { UserContext } from '@infrastructure/context';
import { useRouter } from '@infrastructure/utils';

import { IUserProviderProps } from './user-provider.types';

export const UserProvider = ({ children }: IUserProviderProps): JSX.Element => {
  const { redirectToHome, redirectToOnboarding } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>();
  const [user, setUser] = useState<(User & IProfile) | null>(null);

  const { getLoggedProfile } = useLoggedProfile();
  const { setSupabaseCookie } = useSetSupabaseCookie();

  const getUserProfile = async () => {
    if (user) {
      return;
    }

    setIsLoading(true);
    const sessionUser = supabaseModule.getUser();

    if (sessionUser) {
      await setSupabaseCookie();
      const response = await getLoggedProfile();

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
    redirectToHome();
  };

  const loginViaGoogle = async () => {
    await supabaseModule.loginViaGoogle();

    redirectToOnboarding();
  };

  const setNotionData = (hasNotionData: boolean) =>
    setUser((_prevUser) => ({
      ..._prevUser!,
      hasNotionData,
    }));

  const providerValue = Object.freeze({
    user,
    logout,
    isLoading,
    setNotionData,
    loginViaGoogle,
    isUserAuthenticated: !!user,
  });

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};
