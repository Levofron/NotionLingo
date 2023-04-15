import { LocalStorageApi } from '@api/local-storage/local-storage.types';

import { LocalStorageRepository } from '@domain/local-storage/local-storage.repository';

export const getLocalStorageRepository = (
  localStorageApi: LocalStorageApi,
): LocalStorageRepository => ({
  isSupported: () => localStorageApi.isSupported(),
  getItem: (key) => localStorageApi.getItem(key),
  setItem: (key, value) => localStorageApi.setItem(key, value),
  removeItem: (key) => localStorageApi.removeItem(key),
});
