import {
  IContact,
  IHash,
  IIncreaseDailyStreak,
  INotionPage,
  INotionWord,
  IUser,
} from './rest.models';

export interface IRestRepository {
  getAvailableNotionPages: () => Promise<INotionPage[]>;
  getLoggedUser: () => Promise<IUser>;
  getRandomNotionWords: () => Promise<INotionWord[]>;
  healthCheck: () => Promise<string>;
  increaseDailyStreak: () => Promise<IIncreaseDailyStreak>;
  sendContactFormData: (data: IContact) => Promise<IContact>;
  setNotionApiToken: (token: string) => Promise<IHash>;
  setNotionPageId: (pageId: string) => Promise<string>;
  setSupabaseCookie: () => Promise<void>;
}
