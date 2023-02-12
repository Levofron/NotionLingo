import {
  IContact,
  IHash,
  IIncreaseDailyStreak,
  INotionDatabase,
  INotionWord,
  IProfile,
} from '../entities/rest.types';

export interface IRestRepository {
  deleteProfile: () => Promise<void>;
  getAvailableNotionDatabases: () => Promise<INotionDatabase[]>;
  getLoggedProfile: () => Promise<IProfile>;
  getRandomNotionWords: () => Promise<INotionWord[]>;
  healthCheck: () => Promise<string>;
  increaseDailyStreak: () => Promise<IIncreaseDailyStreak>;
  resetNotionIntegration: () => Promise<void>;
  sendContactFormData: (data: IContact) => Promise<IContact>;
  setNotionApiToken: (token: string) => Promise<IHash>;
  setNotionDatabaseId: (databaseId: string) => Promise<string>;
  setSupabaseCookie: () => Promise<void>;
}
