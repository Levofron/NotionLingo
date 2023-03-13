import {
  IContact,
  IDictionarySuggestions,
  IHash,
  IIncreaseDailyStreak,
  INotionDatabase,
  INotionWord,
  IProfile,
  IUpdateNotionWordRequest,
  TNotionTableColumn,
} from '../entities/rest.types';

export interface IRestRepository {
  createNotionWord: (data: Record<string, string>) => Promise<string>;
  deleteProfile: () => Promise<void>;
  getAvailableNotionDatabases: () => Promise<INotionDatabase[]>;
  getDictionarySuggestions: (word: string) => Promise<IDictionarySuggestions | null>;
  getLoggedProfile: () => Promise<IProfile>;
  getNotionTableColumns: () => Promise<TNotionTableColumn[]>;
  getRandomNotionWords: () => Promise<INotionWord[]>;
  healthCheck: () => Promise<string>;
  increaseDailyStreak: () => Promise<IIncreaseDailyStreak>;
  resetNotionIntegration: () => Promise<void>;
  sendContactFormData: (data: IContact) => Promise<IContact>;
  setNotionApiToken: (token: string) => Promise<IHash>;
  setNotionDatabaseId: (databaseId: string) => Promise<string>;
  setSupabaseCookie: () => Promise<void>;
  updateNotionWord: (data: IUpdateNotionWordRequest) => Promise<string>;
}
