import { User } from '@supabase/supabase-js';

import { IProfile } from '@domain/rest/rest.models';
import { IOAuthResponse } from '@domain/supabase/supabase.models';

export interface IUserContextValue {
  isLoading: boolean | undefined;
  isUserAuthenticated: boolean;
  loginViaMagicLink: (email: string) => Promise<IOAuthResponse>;
  logout: () => void;
  setNotionData: (hasNotionData: boolean) => void;
  user: (User & IProfile) | null;
}
