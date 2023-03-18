import { User } from '@supabase/supabase-js';

import { IProfile } from '@domain/entities/rest.types';
import { IOAuthResponse } from '@domain/entities/supabase.types';

export interface IUserContextValue {
  isLoading: boolean | undefined;
  isUserAuthenticated: boolean;
  loginViaMagicLink: (email: string) => Promise<IOAuthResponse>;
  logout: () => void;
  setNotionData: (hasNotionData: boolean) => void;
  user: (User & IProfile) | null;
}
