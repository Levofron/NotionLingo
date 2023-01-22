import { ILocalStorageRepository } from '@domain/local-storage/local-storage.repository';

import { ILocalStorageSource } from '../../sources/local-storage/local-storage.types';

export const getLocalStorageRepository = (
  localStorageSource: ILocalStorageSource,
): ILocalStorageRepository => ({
  isSupported: () => localStorageSource.isSupported(),
  getItem: (key) => {
    if (!localStorageSource.isSupported()) {
      return null;
    }

    return localStorageSource.getItem(key);
  },
  setItem: (key, value) => {
    if (!localStorageSource.isSupported()) {
      return;
    }

    localStorageSource.setItem(key, value);
  },
  removeItem: (key) => {
    if (!localStorageSource.isSupported()) {
      return;
    }

    localStorageSource.removeItem(key);
  },
});
