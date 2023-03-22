import { User } from '@supabase/supabase-js';

import { IProfile } from '@domain/rest/rest.types';
import { IOAuthResponse } from '@domain/supabase/supabase.entities';

export interface IUserContextValue {
  isLoading: boolean | undefined;
  isUserAuthenticated: boolean;
  loginViaMagicLink: (email: string) => Promise<IOAuthResponse>;
  logout: () => void;
  setNotionData: (hasNotionData: boolean) => void;
  user: (User & IProfile) | null;
}
