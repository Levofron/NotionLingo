import { useEffect, useState } from 'react';

import { IUser } from '@domain/rest/rest.models';
import { TUser } from '@domain/supabase/supabase.types';

import { restModule, supabaseModule } from '@adapter';

import { UserContext } from '@infrastructure/context';

import { IUserProviderProps } from './user-provider.types';

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

export const UserProvider = ({ children }: IUserProviderProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<(TUser & IUser) | null>(null);

  const getUserProfile = async () => {
    if (user) {
      return;
    }

    setIsLoading(true);
    const sessionUser = supabaseModule.getUser();

    if (sessionUser) {
      await restModule.setSupabaseCookie();
      // TODO - wtf is this? xD
      await delay(1000);

      const response = await restModule.getLoggedUser();

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
    await restModule.setSupabaseCookie();

    setUser(null);
  };

  const providerValue = {
    user,
    logout,
    isLoading,
    isUserAuthenticated: !!user,
    loginViaGoogle: supabaseModule.loginViaGoogle,
  };

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};
