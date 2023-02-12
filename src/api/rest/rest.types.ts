import { Session } from '@supabase/supabase-js';
import { AxiosResponse } from 'axios';

import {
  IContact,
  IHash,
  IIncreaseDailyStreak,
  INotionDatabase,
  IProfile,
} from '@domain/entities/rest.types';

export interface INotionWordResponseRecord {
  exampleSentence: string;
  exampleSentenceSuggestion?: string;
  id: string;
  ipa: string | null;
  meaning: string;
  meaningSuggestion?: string;
  type: string | string[] | null;
  word: string;
}

export enum ERestEndpoints {
  CONTACT = '/contact',
  DELETE_PROFILE = '/profile/delete',
  GET_AVAILABLE_NOTION_DATABASES = '/notion/available-databases',
  GET_LOGGED_PROFILE = '/profile/logged',
  GET_RANDOM_NOTION_WORDS = '/notion/random-words',
  HEALTH_CHECK = '/health-check',
  INCREASE_DAILY_STREAK = '/profile/increase-daily-streak',
  RESET_NOTION_INTEGRATION = '/profile/reset-notion-integration',
  SET_NOTION_API_TOKEN = '/notion/set-api-token',
  SET_NOTION_DATABASE_ID = '/notion/set-database-id',
  SET_SUPABASE_COOKIE = '/set-supabase-cookie',
}

export interface IRestApi {
  deleteProfile: () => Promise<void>;
  getAvailableNotionDatabases: () => Promise<AxiosResponse<INotionDatabase[]>>;
  getLoggedProfile: () => Promise<AxiosResponse<IProfile>>;
  getRandomNotionWords: () => Promise<AxiosResponse<INotionWordResponseRecord[]>>;
  healthCheck: () => Promise<AxiosResponse<string>>;
  increaseDailyStreak: () => Promise<AxiosResponse<IIncreaseDailyStreak>>;
  resetNotionIntegration: () => Promise<void>;
  sendContactFormData: (data: IContact) => Promise<AxiosResponse<IContact>>;
  setNotionApiToken: (token: string) => Promise<AxiosResponse<IHash>>;
  setNotionDatabaseId: (databaseId: string) => Promise<AxiosResponse<string>>;
  setSupabaseCookie: (supabaseSession: Session | null) => Promise<void>;
}
