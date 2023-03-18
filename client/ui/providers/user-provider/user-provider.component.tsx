import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { useLoggedProfile, useSetSupabaseCookie } from '@adapter/hooks';
import { supabaseModule } from '@adapter/modules';

import { IProfile } from '@domain/entities/rest.types';

import { UserContext } from '@infrastructure/context';
import { useRouter } from '@infrastructure/utils';

import { IUserProviderProps } from './user-provider.types';

const loginViaMagicLink = (email: string) => supabaseModule.loginViaMagicLink(email);

export const UserProvider = ({ children }: IUserProviderProps): JSX.Element => {
  const { redirectToHome } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>();
  const [user, setUser] = useState<(User & IProfile) | null>(null);

  const { getLoggedProfile } = useLoggedProfile();
  const { setSupabaseCookie } = useSetSupabaseCookie();

  const getUserProfile = async () => {
    if (user) {
      return;
    }

    const sessionUser = supabaseModule.getUser();

    if (sessionUser) {
      setIsLoading(true);

      try {
        await setSupabaseCookie();
        const response = await getLoggedProfile();

        setUser({ ...sessionUser, ...response });
      } finally {
        setIsLoading(false);
      }
    }
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
    loginViaMagicLink,
    isUserAuthenticated: !!user,
  });

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};
