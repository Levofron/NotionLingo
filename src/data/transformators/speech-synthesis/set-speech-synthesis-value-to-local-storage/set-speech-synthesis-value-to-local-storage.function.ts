import { ISetSpeechSynthesisValueToLocalStorageParams } from './set-speech-synthesis-value-to-local-storage.types';

export const setSpeechSynthesisValueToLocalStorage = ({
  defaultValue,
  key,
  localStorageSource,
  max,
  min,
  newValue,
}: ISetSpeechSynthesisValueToLocalStorageParams): void => {
  if (!newValue) {
    return localStorageSource.setItem(key, defaultValue.toString());
  }

  const newValueAsNumber = Number(newValue);

  if (Number.isNaN(newValueAsNumber)) {
    return localStorageSource.setItem(key, defaultValue.toString());
  }

  if (newValueAsNumber < min || newValueAsNumber > max) {
    return localStorageSource.setItem(key, defaultValue.toString());
  }
};
