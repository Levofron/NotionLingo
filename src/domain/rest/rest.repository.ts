import { AxiosResponse } from 'axios';

export interface IRestRepository {
  healthCheck: () => Promise<AxiosResponse<string>>;
  setSupabaseCookie: () => Promise<void>;
}
