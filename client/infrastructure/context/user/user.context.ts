import { createContext } from 'react';

import { IUserContextValue } from './user.types';

export const UserContext = createContext<IUserContextValue | null>(null);
