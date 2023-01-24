import { IGetSpeechSynthesisValueFromLocalStorageParams } from './get-speech-synthesis-value-from-local-storage.types';

export const getSpeechSynthesisValueFromLocalStorage = ({
  defaultValue,
  key,
  localStorageSource,
  max,
  min,
}: IGetSpeechSynthesisValueFromLocalStorageParams): number => {
  const value = localStorageSource.getItem(key);

  if (!value) {
    localStorageSource.setItem(key, defaultValue.toString());

    return defaultValue;
  }

  const valueAsNumber = Number(value);

  if (Number.isNaN(valueAsNumber)) {
    localStorageSource.setItem(key, defaultValue.toString());

    return defaultValue;
  }

  if (valueAsNumber < min || valueAsNumber > max) {
    localStorageSource.setItem(key, defaultValue.toString());

    return defaultValue;
  }

  return valueAsNumber;
};
