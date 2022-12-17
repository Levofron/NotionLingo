import { IOAuthResponse, TUser } from '@domain/supabase/supabase.types';

export interface IUserContextValue {
  isUserAuthenticated: boolean;
  loginViaGoogle: () => Promise<IOAuthResponse>;
  logout: () => void;
  user: TUser | null;
}
