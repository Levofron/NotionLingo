import { Session } from '@supabase/supabase-js';
import { AxiosResponse } from 'axios';

import {
  IContact,
  IHash,
  IIncreaseDailyStreak,
  INotionDatabase,
  IProfile,
  IUpdateNotionWordRequest,
  IWordSuggestions,
  TNotionTableColumn,
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
  CREATE_NOTION_WORD = '/notion/create',
  DELETE_PROFILE = '/profile/delete',
  GET_AVAILABLE_NOTION_DATABASES = '/notion/available-databases',
  GET_LOGGED_PROFILE = '/profile/logged',
  GET_NOTION_TABLE_COLUMNS = '/notion/table-columns',
  GET_RANDOM_NOTION_WORDS = '/notion/random-words',
  GET_WORD_SUGGESTIONS = '/cambridge-dictionary/find',
  HEALTH_CHECK = '/health-check',
  INCREASE_DAILY_STREAK = '/profile/increase-daily-streak',
  RESET_NOTION_INTEGRATION = '/profile/reset-notion-integration',
  SET_NOTION_API_TOKEN = '/notion/set-api-token',
  SET_NOTION_DATABASE_ID = '/notion/set-database-id',
  SET_SUPABASE_COOKIE = '/set-supabase-cookie',
  UPDATE_NOTION_WORD = '/notion/update',
}

export interface IRestApi {
  createNotionWord: (
    data: Record<string, string>,
  ) => Promise<AxiosResponse<INotionWordResponseRecord>>;
  deleteProfile: () => Promise<void>;
  getAvailableNotionDatabases: () => Promise<AxiosResponse<INotionDatabase[]>>;
  getLoggedProfile: () => Promise<AxiosResponse<IProfile>>;
  getNotionTableColumns: () => Promise<AxiosResponse<TNotionTableColumn[]>>;
  getRandomNotionWords: () => Promise<AxiosResponse<INotionWordResponseRecord[]>>;
  getWordSuggestions: (word: string) => Promise<AxiosResponse<IWordSuggestions>>;
  healthCheck: () => Promise<AxiosResponse<string>>;
  increaseDailyStreak: () => Promise<AxiosResponse<IIncreaseDailyStreak>>;
  resetNotionIntegration: () => Promise<void>;
  sendContactFormData: (data: IContact) => Promise<AxiosResponse<IContact>>;
  setNotionApiToken: (token: string) => Promise<AxiosResponse<IHash>>;
  setNotionDatabaseId: (databaseId: string) => Promise<AxiosResponse<string>>;
  setSupabaseCookie: (supabaseSession: Session | null) => Promise<void>;
  updateNotionWord: (
    data: IUpdateNotionWordRequest,
  ) => Promise<AxiosResponse<INotionWordResponseRecord>>;
}
