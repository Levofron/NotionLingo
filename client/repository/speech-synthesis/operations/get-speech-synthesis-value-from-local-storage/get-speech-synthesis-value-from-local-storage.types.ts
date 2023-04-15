import { LocalStorageApi } from '@api/local-storage/local-storage.types';

export interface GetSpeechSynthesisValueFromLocalStorageParams {
  defaultValue: number;
  key: string;
  localStorageApi: LocalStorageApi;
  max: number;
  min: number;
}
