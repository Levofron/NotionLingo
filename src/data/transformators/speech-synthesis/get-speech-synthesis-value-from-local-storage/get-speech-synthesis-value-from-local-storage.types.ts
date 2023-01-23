import { ILocalStorageSource } from '../../../sources/local-storage/local-storage.types';

export interface IGetSpeechSynthesisValueFromLocalStorageParams {
  defaultValue: number;
  key: string;
  localStorageSource: ILocalStorageSource;
  max: number;
  min: number;
}
