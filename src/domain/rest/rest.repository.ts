import { AxiosResponse } from 'axios';

export interface IRestRepository {
  healthCheck: () => Promise<AxiosResponse<string>>;
}
