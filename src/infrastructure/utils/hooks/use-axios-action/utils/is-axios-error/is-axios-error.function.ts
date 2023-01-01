import { AxiosError } from 'axios';

export const isAxiosError = (error: unknown): error is AxiosError =>
  !!error && typeof error === 'object' && (error as AxiosError).isAxiosError === true;
