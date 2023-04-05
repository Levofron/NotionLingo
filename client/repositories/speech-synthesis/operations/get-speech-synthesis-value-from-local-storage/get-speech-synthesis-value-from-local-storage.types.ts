import { ILocalStorageApi } from '@api/local-storage/local-storage.types';

export interface IGetSpeechSynthesisValueFromLocalStorageParams {
  defaultValue: number;
  key: string;
  localStorageApi: ILocalStorageApi;
  max: number;
  min: number;
}
