import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_APP_URL;
const apiRouteSecret = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;

export const axiosConfiguration: AxiosRequestConfig = {
  baseURL,
  timeout: 15_000,
  timeoutErrorMessage: 'Request timeout.',
  headers: {
    authorization: apiRouteSecret,
    'Content-Type': 'application/json;charset=utf-8',
  },
};

export const axiosInstance = axios.create(axiosConfiguration);
