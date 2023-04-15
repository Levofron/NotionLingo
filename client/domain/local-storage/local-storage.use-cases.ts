import { UseCaseWithSingleParam, UseCaseWithoutParams } from '../use-cases.types';
import { SetItemParams } from './local-storage.models';
import { LocalStorageRepository } from './local-storage.repository';

// isSupportedUseCase
export type IsSupportedUseCase = UseCaseWithoutParams<boolean>;

export const isSupportedUseCase = (
  localStorageRepository: LocalStorageRepository,
): IsSupportedUseCase => ({
  execute: () => localStorageRepository.isSupported(),
});

// setItemUseCase
export type SetItemUseCase = UseCaseWithSingleParam<SetItemParams, void>;

export const setItemUseCase = (localStorageRepository: LocalStorageRepository): SetItemUseCase => ({
  execute: (params) => {
    if (!localStorageRepository.isSupported()) {
      return;
    }

    localStorageRepository.setItem(params.key, params.value);
  },
});

// getItemUseCase
export type GetItemUseCase = UseCaseWithSingleParam<string, string | null>;

export const getItemUseCase = (localStorageRepository: LocalStorageRepository): GetItemUseCase => ({
  execute: (key) => {
    if (!localStorageRepository.isSupported()) {
      return null;
    }

    return localStorageRepository.getItem(key);
  },
});

// removeItemUseCase
export type RemoveItemUseCase = UseCaseWithSingleParam<string, void>;

export const removeItemUseCase = (
  localStorageRepository: LocalStorageRepository,
): RemoveItemUseCase => ({
  execute: (key) => {
    if (!localStorageRepository.isSupported()) {
      return;
    }

    localStorageRepository.removeItem(key);
  },
});
