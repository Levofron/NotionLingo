import { ReactNode } from 'react';

import { IUser } from '@domain/rest/rest.models';
import { TUser } from '@domain/supabase/supabase.types';

export interface IUserProviderProps {
  children: ReactNode;
}

export interface IState {
  isLoading: boolean | undefined;
  user: (TUser & IUser) | null;
}
