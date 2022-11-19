import { AxiosResponse } from 'axios';

export interface IRestSource {
  healthCheck: () => Promise<AxiosResponse<string>>;
}
