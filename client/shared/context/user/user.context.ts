import { createContext } from 'react';

import { UserContextValue } from './user.types';

export const UserContext = createContext<UserContextValue | null>(null);
