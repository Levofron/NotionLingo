import { functionImportTest } from '@infrastructure/utils';

import { getLocalStorageSource } from './local-storage.source';

describe('getLocalStorageSource function', () => {
  functionImportTest(getLocalStorageSource);

  it('should return an object with the expected properties', () => {
    const localStorageSource = getLocalStorageSource();

    expect(localStorageSource).toEqual({
      getItem: expect.any(Function),
      setItem: expect.any(Function),
      removeItem: expect.any(Function),
      isSupported: expect.any(Function),
    });
  });

  it('should call isSupported function', () => {
    // @ts-expect-error
    delete window.localStorage;
    const localStorageSource = getLocalStorageSource();

    expect(localStorageSource.isSupported()).toBeFalsy();

    // @ts-expect-error
    window.localStorage = {};

    expect(localStorageSource.isSupported()).toBeTruthy();
  });

  it('should call getItem function', () => {
    const localStorageSource = getLocalStorageSource();

    // @ts-expect-error
    window.localStorage = {
      getItem: jest.fn(),
    };

    localStorageSource.getItem('key');

    expect(window.localStorage.getItem).toHaveBeenCalledWith('key');
  });

  it('should call setItem function', () => {
    const localStorageSource = getLocalStorageSource();

    // @ts-expect-error
    window.localStorage = {
      setItem: jest.fn(),
    };

    localStorageSource.setItem('key', 'value');

    expect(window.localStorage.setItem).toHaveBeenCalledWith('key', 'value');
  });

  it('should call removeItem function', () => {
    const localStorageSource = getLocalStorageSource();

    // @ts-expect-error
    window.localStorage = {
      removeItem: jest.fn(),
    };

    localStorageSource.removeItem('key');

    expect(window.localStorage.removeItem).toHaveBeenCalledWith('key');
  });
});
