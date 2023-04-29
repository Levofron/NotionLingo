import { setSpeechSynthesisValueToLocalStorage } from './set-speech-synthesis-value-to-local-storage.function';

describe('setSpeechSynthesisValueToLocalStorage function', () => {
  const defaultValue = 1;
  const key = 'testKey';
  const max = 10;
  const min = 0;

  const localStorageApiMock = {
    getItem: jest.fn(),
    isSupported: jest.fn(),
    removeItem: jest.fn(),
    setItem: jest.fn(),
  };

  beforeEach(() => {
    localStorageApiMock.setItem.mockClear();
  });

  it('should set default value if new value is undefined', () => {
    setSpeechSynthesisValueToLocalStorage({
      defaultValue,
      key,
      localStorageApi: localStorageApiMock,
      max,
      min,
      // @ts-expect-error
      newValue: undefined,
    });

    expect(localStorageApiMock.setItem).toHaveBeenCalledWith(key, defaultValue.toString());
  });

  it('should set default value if new value is NaN', () => {
    setSpeechSynthesisValueToLocalStorage({
      defaultValue,
      key,
      localStorageApi: localStorageApiMock,
      max,
      min,
      // @ts-expect-error
      newValue: 'invalid',
    });

    expect(localStorageApiMock.setItem).toHaveBeenCalledWith(key, defaultValue.toString());
  });

  it('should set default value if new value is less than the minimum value', () => {
    setSpeechSynthesisValueToLocalStorage({
      defaultValue,
      key,
      localStorageApi: localStorageApiMock,
      max,
      min,
      newValue: -1,
    });

    expect(localStorageApiMock.setItem).toHaveBeenCalledWith(key, defaultValue.toString());
  });

  it('should set default value if new value is greater than the maximum value', () => {
    setSpeechSynthesisValueToLocalStorage({
      defaultValue,
      key,
      localStorageApi: localStorageApiMock,
      max,
      min,
      newValue: 11,
    });

    expect(localStorageApiMock.setItem).toHaveBeenCalledWith(key, defaultValue.toString());
  });

  it('should set new value if it is valid', () => {
    setSpeechSynthesisValueToLocalStorage({
      defaultValue,
      key,
      localStorageApi: localStorageApiMock,
      max,
      min,
      newValue: 5,
    });

    expect(localStorageApiMock.setItem).toHaveBeenCalledWith(key, '5');
  });
});
