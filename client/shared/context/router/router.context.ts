import { createContext } from 'react';

import { RouterContextValue } from './router.types';

export const RouterContext = createContext<RouterContextValue>({
  getCurrentPath: () => null,
  getPreviousPath: () => null,
});
