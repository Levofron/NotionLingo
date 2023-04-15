import { LocalStorageApi } from '@api/local-storage/local-storage.types';

export interface SetSpeechSynthesisValueToLocalStorageParams {
  defaultValue: number;
  key: string;
  localStorageApi: LocalStorageApi;
  max: number;
  min: number;
  newValue: number;
}
