import { AxiosResponse } from 'axios';

import { IHash, INotionPage, INotionWord, IUser } from './rest.models';

export interface IRestRepository {
  getAvailableNotionPages: () => Promise<AxiosResponse<INotionPage[]>>;
  getLoggedUser: () => Promise<AxiosResponse<IUser>>;
  getRandomNotionWords: () => Promise<AxiosResponse<INotionWord[]>>;
  healthCheck: () => Promise<AxiosResponse<string>>;
  setNotionApiToken: (token: string) => Promise<AxiosResponse<IHash>>;
  setNotionPageId: (pageId: string) => Promise<AxiosResponse<string>>;
  setSupabaseCookie: () => Promise<void>;
}
