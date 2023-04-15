import { User } from '@supabase/supabase-js';
import { ReactNode } from 'react';

import { Profile } from '@domain/rest/rest.models';

export interface UserProviderProps {
  children: ReactNode;
}

export interface State {
  isLoading: boolean | undefined;
  user: (User & Profile) | null;
}
