import {
  IContact,
  IHash,
  IIncreaseDailyStreak,
  INotionPage,
  INotionWord,
  IUser,
  IWordSuggestions,
} from './rest.models';

export interface IRestRepository {
  deleteProfile: () => Promise<void>;
  getAvailableNotionPages: () => Promise<INotionPage[]>;
  getLoggedUser: () => Promise<IUser>;
  getRandomNotionWords: () => Promise<INotionWord[]>;
  getWordSuggestions: (word: string) => Promise<IWordSuggestions>;
  healthCheck: () => Promise<string>;
  increaseDailyStreak: () => Promise<IIncreaseDailyStreak>;
  resetNotionIntegration: () => Promise<void>;
  sendContactFormData: (data: IContact) => Promise<IContact>;
  setNotionApiToken: (token: string) => Promise<IHash>;
  setNotionPageId: (pageId: string) => Promise<string>;
  setSupabaseCookie: () => Promise<void>;
}
