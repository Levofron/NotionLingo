import axios, { AxiosRequestConfig } from 'axios';

const apiRouteSecret = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;

export const axiosConfiguration: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 20_000,
  timeoutErrorMessage: 'Request timeout',
  headers: {
    authorization: apiRouteSecret,
    'Content-Type': 'application/json;charset=utf-8',
  },
};

export const axiosInstance = axios.create(axiosConfiguration);
