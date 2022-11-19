import { IRestSource } from './rest.types';
import { restEndpoints } from './rest.defaults';

import { AxiosInstance } from 'axios';

export const getRestSource = (axiosInstance: AxiosInstance): IRestSource => ({
  healthCheck: async () => {
    const response = await axiosInstance.get(restEndpoints.HEALTH_CHECK);

    return response;
  },
});
