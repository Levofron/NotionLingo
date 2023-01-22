import { IUseCaseWithSingleParam, IUseCaseWithoutParams } from '../common.types';
import { ILocalStorageRepository } from './local-storage.repository';
import { ISetItemParams } from './local-storage.types';

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
  execute: (params) => localStorageRepository.setItem(params.key, params.value),
});

// getItemUseCase
export type TGetItemUseCase = IUseCaseWithSingleParam<string, string | null>;

export const getItemUseCase = (
  localStorageRepository: ILocalStorageRepository,
): TGetItemUseCase => ({
  execute: (key) => localStorageRepository.getItem(key),
});

// removeItemUseCase
export type TRemoveItemUseCase = IUseCaseWithSingleParam<string, void>;

export const removeItemUseCase = (
  localStorageRepository: ILocalStorageRepository,
): TRemoveItemUseCase => ({
  execute: (key) => localStorageRepository.removeItem(key),
});
