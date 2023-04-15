import { User } from '@supabase/supabase-js';

import { Profile } from '@domain/rest/rest.models';
import { OAuthResponse } from '@domain/supabase/supabase.models';

export interface UserContextValue {
  isLoading: boolean | undefined;
  isUserAuthenticated: boolean;
  loginViaMagicLink: (email: string) => Promise<OAuthResponse>;
  logout: () => void;
  setNotionData: (hasNotionData: boolean) => void;
  user: (User & Profile) | null;
}
