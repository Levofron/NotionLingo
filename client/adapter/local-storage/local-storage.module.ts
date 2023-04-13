import { getLocalStorageRepository } from '@repository/local-storage/local-storage.repository';

import { getLocalStorageApi } from '@api/local-storage/local-storage.api';

import {
  getItemUseCase,
  isSupportedUseCase,
  removeItemUseCase,
  setItemUseCase,
} from '@domain/local-storage/local-storage.use-cases';

// apis
const localStorageApi = getLocalStorageApi();

// repositories
const localStorageRepository = getLocalStorageRepository(localStorageApi);

export const localStorageModule = {
  getItem: getItemUseCase(localStorageRepository).execute,
  setItem: setItemUseCase(localStorageRepository).execute,
  removeItem: removeItemUseCase(localStorageRepository).execute,
  isSupported: isSupportedUseCase(localStorageRepository).execute,
};
