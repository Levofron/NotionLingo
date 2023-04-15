import { Session } from '@supabase/supabase-js';

import {
  Contact,
  DictionarySuggestions,
  Hash,
  IncreaseDailyStreak,
  NotionDatabase,
  NotionTableColumn,
  NotionWord,
  Profile,
  UpdateNotionWordRequest,
} from './rest.models';

export interface RestRepository {
  createNotionWord: (data: Record<string, string>) => Promise<string>;
  deleteProfile: () => Promise<void>;
  getAvailableNotionDatabases: () => Promise<NotionDatabase[]>;
  getDictionarySuggestions: (word: string) => Promise<DictionarySuggestions | null>;
  getLoggedProfile: () => Promise<Profile>;
  getNotionTableColumns: () => Promise<NotionTableColumn[]>;
  getRandomNotionWords: () => Promise<NotionWord[]>;
  healthCheck: () => Promise<string>;
  increaseDailyStreak: () => Promise<IncreaseDailyStreak>;
  resetNotionIntegration: () => Promise<void>;
  sendContactFormData: (data: Contact) => Promise<Contact>;
  setNotionApiToken: (token: string) => Promise<Hash>;
  setNotionDatabaseId: (databaseId: string) => Promise<string>;
  setSupabaseCookie: (session: Session | null) => Promise<void>;
  updateNotionWord: (data: UpdateNotionWordRequest) => Promise<NotionWord[]>;
}
