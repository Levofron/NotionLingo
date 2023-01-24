import { ILocalStorageSource } from '../../../sources/local-storage/local-storage.types';

export interface ISetSpeechSynthesisValueToLocalStorageParams {
  defaultValue: number;
  key: string;
  localStorageSource: ILocalStorageSource;
  max: number;
  min: number;
  newValue: number;
}
