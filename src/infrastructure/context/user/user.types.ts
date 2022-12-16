import { IOAuthResponse, TUser } from '@domain/supabase/supabase.types';

export interface IUserContextValue {
  loginViaGoogle: () => Promise<IOAuthResponse>;
  logout: () => void;
  user: TUser | null;
}
