import {
  IContact,
  IHash,
  IIncreaseDailyStreak,
  INotionDatabase,
  INotionWord,
  IUser,
  IWordSuggestions,
} from './rest.models';

export interface IRestRepository {
  deleteProfile: () => Promise<void>;
  getAvailableNotionDatabases: () => Promise<INotionDatabase[]>;
  getLoggedUser: () => Promise<IUser>;
  getRandomNotionWords: () => Promise<INotionWord[]>;
  getWordSuggestions: (word: string) => Promise<IWordSuggestions>;
  healthCheck: () => Promise<string>;
  increaseDailyStreak: () => Promise<IIncreaseDailyStreak>;
  resetNotionIntegration: () => Promise<void>;
  sendContactFormData: (data: IContact) => Promise<IContact>;
  setNotionApiToken: (token: string) => Promise<IHash>;
  setNotionDatabaseId: (databaseId: string) => Promise<string>;
  setSupabaseCookie: () => Promise<void>;
}
