import { ILocalStorageApi } from '@api/local-storage/local-storage.types';

import { ILocalStorageRepository } from '@domain/local-storage/local-storage.repository';

export const getLocalStorageRepository = (
  localStorageApi: ILocalStorageApi,
): ILocalStorageRepository => ({
  isSupported: () => localStorageApi.isSupported(),
  getItem: (key) => localStorageApi.getItem(key),
  setItem: (key, value) => localStorageApi.setItem(key, value),
  removeItem: (key) => localStorageApi.removeItem(key),
});
