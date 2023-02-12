import { getLocalStorageApi } from '@api/local-storage/local-storage.api';
import { getLocalStorageRepository } from '@repositories/local-storage/local-storage.repository';

import {
  getItemUseCase,
  isSupportedUseCase,
  removeItemUseCase,
  setItemUseCase,
} from '@domain/use-cases/local-storage.use-cases';

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
