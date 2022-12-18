import { useEffect, useState } from 'react';

import { TUser } from '@domain/supabase/supabase.types';

import { restModule, supabaseModule } from '@adapter';

import { UserContext } from '@infrastructure/context';

import { IUserProviderProps } from './user-provider.types';

export const UserProvider = ({ children }: IUserProviderProps): JSX.Element => {
  const [user, setUser] = useState<TUser | null>(null);

  const getUserProfile = () => setUser(supabaseModule.getUser());

  useEffect(() => {
    getUserProfile();

    supabaseModule.onAuthStateChange(getUserProfile);
  }, []);

  useEffect(() => {
    restModule.setSupabaseCookie();
  }, [JSON.stringify(user)]);

  const logout = () => supabaseModule.logout().then(() => setUser(null));

  const providerValue = {
    user,
    logout,
    isUserAuthenticated: !!user,
    loginViaGoogle: supabaseModule.loginViaGoogle,
  };

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};
