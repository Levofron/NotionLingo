import { SetSpeechSynthesisValueToLocalStorageParams } from './set-speech-synthesis-value-to-local-storage.types';

export const setSpeechSynthesisValueToLocalStorage = ({
  defaultValue,
  key,
  localStorageApi,
  max,
  min,
  newValue,
}: SetSpeechSynthesisValueToLocalStorageParams): void => {
  if (!newValue && newValue !== 0) {
    return localStorageApi.setItem(key, defaultValue.toString());
  }

  const newValueAsNumber = Number(newValue);

  if (Number.isNaN(newValueAsNumber)) {
    return localStorageApi.setItem(key, defaultValue.toString());
  }

  if (newValueAsNumber < min || newValueAsNumber > max) {
    return localStorageApi.setItem(key, defaultValue.toString());
  }

  localStorageApi.setItem(key, newValueAsNumber.toString());
};
