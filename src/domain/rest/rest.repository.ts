import { IHash, INotionPage, INotionWord, IUser } from './rest.models';

export interface IRestRepository {
  getAvailableNotionPages: () => Promise<INotionPage[]>;
  getLoggedUser: () => Promise<IUser>;
  getRandomNotionWords: () => Promise<INotionWord[]>;
  healthCheck: () => Promise<string>;
  setNotionApiToken: (token: string) => Promise<IHash>;
  setNotionPageId: (pageId: string) => Promise<string>;
  setSupabaseCookie: () => Promise<void>;
}
