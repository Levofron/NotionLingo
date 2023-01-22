import {
  getItemUseCase,
  isSupportedUseCase,
  removeItemUseCase,
  setItemUseCase,
} from '@domain/local-storage/local-storage.use-case';

import { getLocalStorageRepository } from '@data/repositories/local-storage/local-storage.repository';
import { getLocalStorageSource } from '@data/sources/local-storage/local-storage.source';

// sources
const localStorageSource = getLocalStorageSource();

// repositories
const localStorageRepository = getLocalStorageRepository(localStorageSource);

export const localStorageModule = {
  getItem: getItemUseCase(localStorageRepository).execute,
  setItem: setItemUseCase(localStorageRepository).execute,
  removeItem: removeItemUseCase(localStorageRepository).execute,
  isSupported: isSupportedUseCase(localStorageRepository).execute,
};
