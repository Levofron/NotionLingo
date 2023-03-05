import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { localStorageModule } from '@adapter/modules';

import { RouterContext } from '@infrastructure/context';

import { IRouterProviderProps } from './router-provider.types';

const CURRENT_PATH_KEY = 'currentPath';
const PREVIOUS_PATH_KEY = 'previousPath';

const getCurrentPath = () => localStorageModule.getItem(CURRENT_PATH_KEY);

const getPreviousPath = () => localStorageModule.getItem(PREVIOUS_PATH_KEY);

const getNonNullableCurrentPath = () => {
  const currentPath = getCurrentPath();

  return currentPath ?? window.location.pathname;
};

const updateStorePathValues = () => {
  if (!localStorageModule.isSupported()) return;

  const currentPath = getNonNullableCurrentPath();

  localStorageModule.setItem({ key: PREVIOUS_PATH_KEY, value: currentPath });
  localStorageModule.setItem({ key: CURRENT_PATH_KEY, value: window.location.pathname });
};

export const RouterProvider: FC<IRouterProviderProps> = ({ children }): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorageModule.isSupported()) return;

    localStorageModule.removeItem(PREVIOUS_PATH_KEY);
    localStorageModule.setItem({ key: CURRENT_PATH_KEY, value: window.location.pathname });
  }, []);

  useEffect(updateStorePathValues, [router.asPath]);

  return (
    <RouterContext.Provider value={{ getCurrentPath, getPreviousPath }}>
      {children}
    </RouterContext.Provider>
  );
};

export default RouterProvider;
