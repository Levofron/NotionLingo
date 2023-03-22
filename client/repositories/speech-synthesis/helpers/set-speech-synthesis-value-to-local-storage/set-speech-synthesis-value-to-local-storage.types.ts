import { ILocalStorageApi } from '@api/local-storage/local-storage.types';

export interface ISetSpeechSynthesisValueToLocalStorageParams {
  defaultValue: number;
  key: string;
  localStorageApi: ILocalStorageApi;
  max: number;
  min: number;
  newValue: number;
}
