import { AxiosResponse } from 'axios';
import { IUser, IHash } from './rest.models';

export interface IRestRepository {
  getAvailableNotionPages: () => Promise<AxiosResponse<void>>;
  getLoggedUser: () => Promise<AxiosResponse<IUser>>;
  healthCheck: () => Promise<AxiosResponse<string>>;
  setNotionApiToken: (token: string) => Promise<AxiosResponse<IHash>>;
  setNotionPageId: (pageId: string) => Promise<AxiosResponse<void>>;
  setSupabaseCookie: () => Promise<void>;
}
