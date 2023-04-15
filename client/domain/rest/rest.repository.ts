import { Session } from '@supabase/supabase-js';

import {
  IContact,
  IDictionarySuggestions,
  IHash,
  IIncreaseDailyStreak,
  INotionDatabase,
  INotionWord,
  IProfile,
  IUpdateNotionWordRequest,
  NotionTableColumn,
} from './rest.models';

export interface IRestRepository {
  createNotionWord: (data: Record<string, string>) => Promise<string>;
  deleteProfile: () => Promise<void>;
  getAvailableNotionDatabases: () => Promise<INotionDatabase[]>;
  getDictionarySuggestions: (word: string) => Promise<IDictionarySuggestions | null>;
  getLoggedProfile: () => Promise<IProfile>;
  getNotionTableColumns: () => Promise<NotionTableColumn[]>;
  getRandomNotionWords: () => Promise<INotionWord[]>;
  healthCheck: () => Promise<string>;
  increaseDailyStreak: () => Promise<IIncreaseDailyStreak>;
  resetNotionIntegration: () => Promise<void>;
  sendContactFormData: (data: IContact) => Promise<IContact>;
  setNotionApiToken: (token: string) => Promise<IHash>;
  setNotionDatabaseId: (databaseId: string) => Promise<string>;
  setSupabaseCookie: (session: Session | null) => Promise<void>;
  updateNotionWord: (data: IUpdateNotionWordRequest) => Promise<INotionWord[]>;
}
