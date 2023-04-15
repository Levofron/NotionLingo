import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { useLoggedProfile, useSetSupabaseCookie } from '@adapter/hooks';
import { supabaseModule } from '@adapter/supabase/supabase.module';

import { Profile } from '@domain/rest/rest.models';

import { UserContext } from '@shared/context';
import { useRouter } from '@shared/hooks';

import { UserProviderProps } from './user-provider.types';

const loginViaMagicLink = (email: string) => supabaseModule.loginViaMagicLink(email);

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const { redirectToHome } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>();
  const [user, setUser] = useState<(User & Profile) | null>(null);

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

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        isLoading,
        setNotionData,
        loginViaMagicLink,
        isUserAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
