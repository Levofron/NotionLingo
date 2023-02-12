import { functionImportTest } from '@infrastructure/utils';

import { getLocalStorageApi } from './local-storage.api';

describe('getLocalStorageApi function', () => {
  functionImportTest(getLocalStorageApi);

  it('should return an object with the expected properties', () => {
    const localStorageSource = getLocalStorageApi();

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
    const localStorageSource = getLocalStorageApi();

    expect(localStorageSource.isSupported()).toBeFalsy();

    // @ts-expect-error
    window.localStorage = {};

    expect(localStorageSource.isSupported()).toBeTruthy();
  });

  it('should call getItem function', () => {
    const localStorageSource = getLocalStorageApi();

    // @ts-expect-error
    window.localStorage = {
      getItem: jest.fn(),
    };

    localStorageSource.getItem('key');

    expect(window.localStorage.getItem).toHaveBeenCalledWith('key');
  });

  it('should call setItem function', () => {
    const localStorageSource = getLocalStorageApi();

    // @ts-expect-error
    window.localStorage = {
      setItem: jest.fn(),
    };

    localStorageSource.setItem('key', 'value');

    expect(window.localStorage.setItem).toHaveBeenCalledWith('key', 'value');
  });

  it('should call removeItem function', () => {
    const localStorageSource = getLocalStorageApi();

    // @ts-expect-error
    window.localStorage = {
      removeItem: jest.fn(),
    };

    localStorageSource.removeItem('key');

    expect(window.localStorage.removeItem).toHaveBeenCalledWith('key');
  });
});
