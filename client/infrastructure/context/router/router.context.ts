import { createContext } from 'react';

import { IRouterContextValue } from './router.types';

export const RouterContext = createContext<IRouterContextValue>({
  getCurrentPath: () => null,
  getPreviousPath: () => null,
});
