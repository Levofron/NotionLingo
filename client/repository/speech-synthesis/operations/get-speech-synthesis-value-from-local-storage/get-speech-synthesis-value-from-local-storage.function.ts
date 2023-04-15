import { GetSpeechSynthesisValueFromLocalStorageParams } from './get-speech-synthesis-value-from-local-storage.types';

export const getSpeechSynthesisValueFromLocalStorage = ({
  defaultValue,
  key,
  localStorageApi,
  max,
  min,
}: GetSpeechSynthesisValueFromLocalStorageParams): number => {
  const value = localStorageApi.getItem(key);

  if (!value) {
    localStorageApi.setItem(key, defaultValue.toString());

    return defaultValue;
  }

  const valueAsNumber = Number(value);

  if (Number.isNaN(valueAsNumber)) {
    localStorageApi.setItem(key, defaultValue.toString());

    return defaultValue;
  }

  if (valueAsNumber < min || valueAsNumber > max) {
    localStorageApi.setItem(key, defaultValue.toString());

    return defaultValue;
  }

  return valueAsNumber;
};
