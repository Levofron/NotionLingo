import { AxiosResponse } from 'axios';

import { IContact, IHash, INotionPage, INotionWord, IUser } from '@domain/rest/rest.models';
import { TSession } from '@domain/supabase/supabase.types';

export interface IRestSource {
  getAvailableNotionPages: () => Promise<AxiosResponse<INotionPage[]>>;
  getLoggedUser: () => Promise<AxiosResponse<IUser>>;
  getRandomNotionWords: () => Promise<AxiosResponse<INotionWord[]>>;
  healthCheck: () => Promise<AxiosResponse<string>>;
  sendContactFormData: (data: IContact) => Promise<AxiosResponse<IContact>>;
  setNotionApiToken: (token: string) => Promise<AxiosResponse<IHash>>;
  setNotionPageId: (pageId: string) => Promise<AxiosResponse<string>>;
  setSupabaseCookie: (supabaseSession: TSession | null) => Promise<void>;
}
