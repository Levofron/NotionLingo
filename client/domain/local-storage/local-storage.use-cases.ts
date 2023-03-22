import { IUseCaseWithSingleParam, IUseCaseWithoutParams } from '../use-cases.types';
import { ISetItemParams } from './local-storage.entities';
import { ILocalStorageRepository } from './local-storage.repository';

// isSupportedUseCase
export type TIsSupportedUseCase = IUseCaseWithoutParams<boolean>;

export const isSupportedUseCase = (
  localStorageRepository: ILocalStorageRepository,
): TIsSupportedUseCase => ({
  execute: () => localStorageRepository.isSupported(),
});

// setItemUseCase
export type TSetItemUseCase = IUseCaseWithSingleParam<ISetItemParams, void>;

export const setItemUseCase = (
  localStorageRepository: ILocalStorageRepository,
): TSetItemUseCase => ({
  execute: (params) => {
    if (!localStorageRepository.isSupported()) {
      return;
    }

    localStorageRepository.setItem(params.key, params.value);
  },
});

// getItemUseCase
export type TGetItemUseCase = IUseCaseWithSingleParam<string, string | null>;

export const getItemUseCase = (
  localStorageRepository: ILocalStorageRepository,
): TGetItemUseCase => ({
  execute: (key) => {
    if (!localStorageRepository.isSupported()) {
      return null;
    }

    return localStorageRepository.getItem(key);
  },
});

// removeItemUseCase
export type TRemoveItemUseCase = IUseCaseWithSingleParam<string, void>;

export const removeItemUseCase = (
  localStorageRepository: ILocalStorageRepository,
): TRemoveItemUseCase => ({
  execute: (key) => {
    if (!localStorageRepository.isSupported()) {
      return;
    }

    localStorageRepository.removeItem(key);
  },
});
