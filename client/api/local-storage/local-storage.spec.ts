import { functionImportTest } from '@infrastructure/utils';

import { getLocalStorageApi } from './local-storage.api';

describe('getLocalStorageApi function', () => {
  functionImportTest(getLocalStorageApi);

  it('should return an object with the expected properties', () => {
    const localStorageApi = getLocalStorageApi();

    expect(localStorageApi).toEqual({
      getItem: expect.any(Function),
      setItem: expect.any(Function),
      removeItem: expect.any(Function),
      isSupported: expect.any(Function),
    });
  });

  it('should call isSupported function', () => {
    // @ts-expect-error
    delete window.localStorage;
    const localStorageApi = getLocalStorageApi();

    expect(localStorageApi.isSupported()).toBeFalsy();

    // @ts-expect-error
    window.localStorage = {};

    expect(localStorageApi.isSupported()).toBeTruthy();
  });

  it('should call getItem function', () => {
    const localStorageApi = getLocalStorageApi();

    // @ts-expect-error
    window.localStorage = {
      getItem: jest.fn(),
    };

    localStorageApi.getItem('key');

    expect(window.localStorage.getItem).toHaveBeenCalledWith('key');
  });

  it('should call setItem function', () => {
    const localStorageApi = getLocalStorageApi();

    // @ts-expect-error
    window.localStorage = {
      setItem: jest.fn(),
    };

    localStorageApi.setItem('key', 'value');

    expect(window.localStorage.setItem).toHaveBeenCalledWith('key', 'value');
  });

  it('should call removeItem function', () => {
    const localStorageApi = getLocalStorageApi();

    // @ts-expect-error
    window.localStorage = {
      removeItem: jest.fn(),
    };

    localStorageApi.removeItem('key');

    expect(window.localStorage.removeItem).toHaveBeenCalledWith('key');
  });
});
