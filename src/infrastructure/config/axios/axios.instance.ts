import axios, { AxiosRequestConfig } from 'axios';

import { API_ROUTE_SECRET } from '@constants';

export const axiosConfiguration: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 20_000,
  timeoutErrorMessage: 'Request timeout',
  headers: {
    authorization: API_ROUTE_SECRET,
    'Content-Type': 'application/json;charset=utf-8',
  },
};

export const axiosInstance = axios.create(axiosConfiguration);
