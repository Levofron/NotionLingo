import { AxiosResponse } from 'axios';

import {
  IContact,
  IHash,
  IIncreaseDailyStreak,
  INotionDatabase,
  IUser,
  IWordSuggestions,
} from '@domain/rest/rest.models';
import { TSession } from '@domain/supabase/supabase.types';

import { INotionWordResponseItem } from '@data/responses.types';

export interface IRestSource {
  deleteProfile: () => Promise<void>;
  getAvailableNotionDatabases: () => Promise<AxiosResponse<INotionDatabase[]>>;
  getLoggedUser: () => Promise<AxiosResponse<IUser>>;
  getRandomNotionWords: () => Promise<AxiosResponse<INotionWordResponseItem[]>>;
  getWordSuggestions: (word: string) => Promise<AxiosResponse<IWordSuggestions>>;
  healthCheck: () => Promise<AxiosResponse<string>>;
  increaseDailyStreak: () => Promise<AxiosResponse<IIncreaseDailyStreak>>;
  resetNotionIntegration: () => Promise<void>;
  sendContactFormData: (data: IContact) => Promise<AxiosResponse<IContact>>;
  setNotionApiToken: (token: string) => Promise<AxiosResponse<IHash>>;
  setNotionDatabaseId: (databaseId: string) => Promise<AxiosResponse<string>>;
  setSupabaseCookie: (supabaseSession: TSession | null) => Promise<void>;
}
