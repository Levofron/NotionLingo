import { Session } from '@supabase/supabase-js';
import { AxiosResponse } from 'axios';

import {
  Contact,
  DictionarySuggestions,
  Hash,
  IncreaseDailyStreak,
  NotionDatabase,
  NotionTableColumn,
  Profile,
  UpdatedNotionWord,
} from '@domain/rest/rest.models';

export interface NotionWordResponseRecord {
  exampleSentence: string;
  exampleSentenceSuggestion?: string;
  id: string;
  ipa: string | null;
  meaning: string;
  meaningSuggestion?: string;
  type: string | string[] | null;
  word: string;
}

export enum RestEndpoints {
  CONTACT = '/contact',
  CREATE_NOTION_WORD = '/notion/create',
  DELETE_PROFILE = '/profile/delete',
  GET_AVAILABLE_NOTION_DATABASES = '/notion/available-databases',
  GET_DICTIONARY_SUGGESTIONS = '/dictionary/find',
  GET_LOGGED_PROFILE = '/profile/logged',
  GET_NOTION_TABLE_COLUMNS = '/notion/table-columns',
  GET_RANDOM_NOTION_WORDS = '/notion/random-words',
  HEALTH_CHECK = '/health-check',
  INCREASE_DAILY_STREAK = '/profile/increase-daily-streak',
  RESET_NOTION_INTEGRATION = '/profile/reset-notion-integration',
  SET_NOTION_API_TOKEN = '/notion/set-api-token',
  SET_NOTION_DATABASE_ID = '/notion/set-database-id',
  SET_SUPABASE_COOKIE = '/set-supabase-cookie',
  UPDATE_NOTION_WORD = '/notion/update',
}

export interface RestApi {
  createNotionWord: (
    data: Record<string, string>,
  ) => Promise<AxiosResponse<NotionWordResponseRecord>>;
  deleteProfile: () => Promise<void>;
  getAvailableNotionDatabases: () => Promise<AxiosResponse<NotionDatabase[]>>;
  getDictionarySuggestions: (word: string) => Promise<AxiosResponse<DictionarySuggestions>>;
  getLoggedProfile: () => Promise<AxiosResponse<Profile>>;
  getNotionTableColumns: () => Promise<AxiosResponse<NotionTableColumn[]>>;
  getRandomNotionWords: () => Promise<AxiosResponse<NotionWordResponseRecord[]>>;
  healthCheck: () => Promise<AxiosResponse<string>>;
  increaseDailyStreak: () => Promise<AxiosResponse<IncreaseDailyStreak>>;
  resetNotionIntegration: () => Promise<void>;
  sendContactFormData: (data: Contact) => Promise<AxiosResponse<Contact>>;
  setNotionApiToken: (token: string) => Promise<AxiosResponse<Hash>>;
  setNotionDatabaseId: (databaseId: string) => Promise<AxiosResponse<string>>;
  setSupabaseCookie: (supabaseSession: Session | null) => Promise<void>;
  updateNotionWord: (word: UpdatedNotionWord) => Promise<AxiosResponse<NotionWordResponseRecord>>;
}
