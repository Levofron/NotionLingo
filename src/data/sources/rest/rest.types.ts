import { IUser, IHash } from '@domain/rest/rest.models';
import { TSession } from '@domain/supabase/supabase.types';
import { AxiosResponse } from 'axios';

export interface IRestSource {
  getLoggedUser: () => Promise<AxiosResponse<IUser>>;
  healthCheck: () => Promise<AxiosResponse<string>>;
  setNotionApiToken: (token: string) => Promise<AxiosResponse<IHash>>;
  setSupabaseCookie: (supabaseSession: TSession | null) => Promise<void>;
}
