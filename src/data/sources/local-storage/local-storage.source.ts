import { ILocalStorageSource } from './local-storage.types';

export const getLocalStorageSource = (): ILocalStorageSource => ({
  isSupported: () => typeof window !== 'undefined' && !!window.localStorage,
  getItem: (key: string) => window.localStorage.getItem(key),
  setItem: (key: string, value: string) => window.localStorage.setItem(key, value),
  removeItem: (key: string) => window.localStorage.removeItem(key),
});
