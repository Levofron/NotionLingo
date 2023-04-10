import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { useLoggedProfile, useSetSupabaseCookie } from '@adapter/hooks';
import { supabaseModule } from '@adapter/modules';

import { IProfile } from '@domain/rest/rest.types';

import { UserContext } from '@infrastructure/context';
import { useRouter } from '@infrastructure/hooks';

import { IUserProviderProps } from './user-provider.types';

const loginViaMagicLink = (email: string) => supabaseModule.loginViaMagicLink(email);

export const UserProvider = ({ children }: IUserProviderProps): JSX.Element => {
  const { redirectToHome } = useRouter();

  const [hasSessionUser, setHasSessionUser] = useState(false);
  const [user, setUser] = useState<(User & IProfile) | null>(null);

  const { getLoggedProfile } = useLoggedProfile();
  const { setSupabaseCookie } = useSetSupabaseCookie();

  const getUserProfile = async () => {
    if (user) {
      return;
    }

    const sessionUser = supabaseModule.getUser();

    setHasSessionUser(!!sessionUser);

    if (sessionUser) {
      try {
        await setSupabaseCookie();
        const response = await getLoggedProfile();

        setUser({ ...sessionUser, ...response });
      } catch {
        setUser(null);
        setHasSessionUser(false);
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
    setHasSessionUser(false);

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
    setNotionData,
    hasSessionUser,
    loginViaMagicLink,
  });

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};
