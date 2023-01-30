import { IUser } from '@domain/rest/rest.models';
import { IOAuthResponse, TUser } from '@domain/supabase/supabase.types';

export interface IUserContextValue {
  isLoading: boolean;
  isUserAuthenticated: boolean;
  loginViaGoogle: () => Promise<IOAuthResponse>;
  logout: () => void;
  resetNotionData: () => void;
  user: (TUser & IUser) | null;
}
