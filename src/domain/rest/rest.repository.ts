import { AxiosResponse } from 'axios';
import { IUser } from './rest.models';

export interface IRestRepository {
  getLoggedUser: () => Promise<AxiosResponse<IUser>>;
  healthCheck: () => Promise<AxiosResponse<string>>;
  setSupabaseCookie: () => Promise<void>;
}
