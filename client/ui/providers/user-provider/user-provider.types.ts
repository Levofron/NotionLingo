import { User } from '@supabase/supabase-js';
import { ReactNode } from 'react';

import { IProfile } from '@domain/rest/rest.types';

export interface IUserProviderProps {
  children: ReactNode;
}

export interface IState {
  isLoading: boolean | undefined;
  user: (User & IProfile) | null;
}
