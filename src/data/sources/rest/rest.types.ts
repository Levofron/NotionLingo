import { AxiosResponse } from 'axios';

import {
  IContact,
  IHash,
  IIncreaseDailyStreak,
  INotionPage,
  IUser,
} from '@domain/rest/rest.models';
import { TSession } from '@domain/supabase/supabase.types';

import { INotionWordResponseItem } from '@data/responses.types';

export interface IRestSource {
  getAvailableNotionPages: () => Promise<AxiosResponse<INotionPage[]>>;
  getLoggedUser: () => Promise<AxiosResponse<IUser>>;
  getRandomNotionWords: () => Promise<AxiosResponse<INotionWordResponseItem[]>>;
  healthCheck: () => Promise<AxiosResponse<string>>;
  increaseDailyStreak: () => Promise<AxiosResponse<IIncreaseDailyStreak>>;
  sendContactFormData: (data: IContact) => Promise<AxiosResponse<IContact>>;
  setNotionApiToken: (token: string) => Promise<AxiosResponse<IHash>>;
  setNotionPageId: (pageId: string) => Promise<AxiosResponse<string>>;
  setSupabaseCookie: (supabaseSession: TSession | null) => Promise<void>;
}
