import { IUser } from '@domain/rest/rest.models';
import { TUser } from '@domain/supabase/supabase.types';

export interface IUserContextValue {
  isLoading: boolean;
  isUserAuthenticated: boolean;
  loginViaGoogle: () => Promise<void>;
  logout: () => void;
  resetNotionData: () => void;
  user: (TUser & IUser) | null;
}
