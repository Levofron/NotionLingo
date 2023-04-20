import { functionImportTest } from '@shared/functions';

import { getSpeechSynthesisValueFromLocalStorage } from './get-speech-synthesis-value-from-local-storage.function';

describe('getSpeechSynthesisValueFromLocalStorage function', () => {
  functionImportTest(getSpeechSynthesisValueFromLocalStorage);

  const localStorageApi = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    isSupported: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return default value when there is no value in local storage', () => {
    const defaultValue = 1;
    const key = 'speechRate';
    const min = 0.1;
    const max = 10;

    localStorageApi.getItem.mockReturnValueOnce(null);

    const result = getSpeechSynthesisValueFromLocalStorage({
      defaultValue,
      key,
      localStorageApi,
      min,
      max,
    });

    expect(localStorageApi.setItem).toHaveBeenCalledWith(key, defaultValue.toString());
    expect(result).toEqual(defaultValue);
  });

  it('should return default value and update local storage when the value in local storage is NaN', () => {
    const defaultValue = 1;
    const key = 'speechRate';
    const min = 0.1;
    const max = 10;

    localStorageApi.getItem.mockReturnValueOnce('invalid-value');

    const result = getSpeechSynthesisValueFromLocalStorage({
      defaultValue,
      key,
      localStorageApi,
      min,
      max,
    });

    expect(localStorageApi.setItem).toHaveBeenCalledWith(key, defaultValue.toString());
    expect(result).toEqual(defaultValue);
  });

  it('should return default value and update local storage when the value in local storage is out of range', () => {
    const defaultValue = 1;
    const key = 'speechRate';
    const min = 0.1;
    const max = 10;

    localStorageApi.getItem.mockReturnValueOnce('11');

    const result = getSpeechSynthesisValueFromLocalStorage({
      defaultValue,
      key,
      localStorageApi,
      min,
      max,
    });

    expect(localStorageApi.setItem).toHaveBeenCalledWith(key, defaultValue.toString());
    expect(result).toEqual(defaultValue);
  });

  it('should return the value from local storage when it is a valid number within the range', () => {
    const defaultValue = 1;
    const key = 'speechRate';
    const min = 0.1;
    const max = 10;

    localStorageApi.getItem.mockReturnValueOnce('2');

    const result = getSpeechSynthesisValueFromLocalStorage({
      defaultValue,
      key,
      localStorageApi,
      min,
      max,
    });

    expect(localStorageApi.setItem).not.toHaveBeenCalled();
    expect(result).toEqual(2);
  });
});
