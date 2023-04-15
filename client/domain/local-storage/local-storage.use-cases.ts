import { IUseCaseWithSingleParam, IUseCaseWithoutParams } from '../use-cases.types';
import { ISetItemParams } from './local-storage.models';
import { ILocalStorageRepository } from './local-storage.repository';

// isSupportedUseCase
export type IsSupportedUseCase = IUseCaseWithoutParams<boolean>;

export const isSupportedUseCase = (
  localStorageRepository: ILocalStorageRepository,
): IsSupportedUseCase => ({
  execute: () => localStorageRepository.isSupported(),
});

// setItemUseCase
export type SetItemUseCase = IUseCaseWithSingleParam<ISetItemParams, void>;

export const setItemUseCase = (
  localStorageRepository: ILocalStorageRepository,
): SetItemUseCase => ({
  execute: (params) => {
    if (!localStorageRepository.isSupported()) {
      return;
    }

    localStorageRepository.setItem(params.key, params.value);
  },
});

// getItemUseCase
export type GetItemUseCase = IUseCaseWithSingleParam<string, string | null>;

export const getItemUseCase = (
  localStorageRepository: ILocalStorageRepository,
): GetItemUseCase => ({
  execute: (key) => {
    if (!localStorageRepository.isSupported()) {
      return null;
    }

    return localStorageRepository.getItem(key);
  },
});

// removeItemUseCase
export type RemoveItemUseCase = IUseCaseWithSingleParam<string, void>;

export const removeItemUseCase = (
  localStorageRepository: ILocalStorageRepository,
): RemoveItemUseCase => ({
  execute: (key) => {
    if (!localStorageRepository.isSupported()) {
      return;
    }

    localStorageRepository.removeItem(key);
  },
});
