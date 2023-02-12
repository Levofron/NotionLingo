import { User } from '@supabase/supabase-js';

import { IProfile } from '@domain/entities/rest.types';

export interface IUserContextValue {
  isLoading: boolean | undefined;
  isUserAuthenticated: boolean;
  loginViaGoogle: () => Promise<void>;
  logout: () => void;
  resetNotionData: () => void;
  user: (User & IProfile) | null;
}
