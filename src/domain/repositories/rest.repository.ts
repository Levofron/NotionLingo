import {
  IContact,
  IHash,
  IIncreaseDailyStreak,
  INotionDatabase,
  INotionWord,
  IProfile,
  IUpdateNotionWordRequest,
  IWordSuggestions,
  TNotionTableColumn,
} from '../entities/rest.types';

export interface IRestRepository {
  createNotionWord: (data: Record<string, string>) => Promise<string>;
  deleteProfile: () => Promise<void>;
  getAvailableNotionDatabases: () => Promise<INotionDatabase[]>;
  getLoggedProfile: () => Promise<IProfile>;
  getNotionTableColumns: () => Promise<TNotionTableColumn[]>;
  getRandomNotionWords: () => Promise<INotionWord[]>;
  getWordSuggestions: (word: string) => Promise<IWordSuggestions>;
  healthCheck: () => Promise<string>;
  increaseDailyStreak: () => Promise<IIncreaseDailyStreak>;
  resetNotionIntegration: () => Promise<void>;
  sendContactFormData: (data: IContact) => Promise<IContact>;
  setNotionApiToken: (token: string) => Promise<IHash>;
  setNotionDatabaseId: (databaseId: string) => Promise<string>;
  setSupabaseCookie: () => Promise<void>;
  updateNotionWord: (data: IUpdateNotionWordRequest) => Promise<string>;
}
