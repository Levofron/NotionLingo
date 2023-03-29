import { functionImportTest } from '@infrastructure/jest';

import { getLocalStorageRepository } from './local-storage.repository';

describe('getLocalStorageRepository function', () => {
  functionImportTest(getLocalStorageRepository);

  it('should return proper object', () => {
    const localStorageRepository = getLocalStorageRepository({
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      isSupported: jest.fn(),
    });

    expect(localStorageRepository).toEqual({
      getItem: expect.any(Function),
      setItem: expect.any(Function),
      removeItem: expect.any(Function),
      isSupported: expect.any(Function),
    });
  });

  it('should call isSupported function', () => {
    const localStorageRepository = getLocalStorageRepository({
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      isSupported: jest.fn().mockReturnValue(true),
    });

    expect(localStorageRepository.isSupported()).toBeTruthy();
  });

  describe('getItem function', () => {
    it('should call if localStorage is supported', () => {
      const apiMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn().mockReturnValue(true),
      };

      const localStorageRepository = getLocalStorageRepository(apiMock);

      localStorageRepository.getItem('key');

      expect(apiMock.getItem).toHaveBeenCalledWith('key');
    });
  });

  describe('setItem function', () => {
    it('should call if localStorage is supported', () => {
      const apiMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn().mockReturnValue(true),
      };

      const localStorageRepository = getLocalStorageRepository(apiMock);

      localStorageRepository.setItem('key', 'value');

      expect(apiMock.setItem).toHaveBeenCalledWith('key', 'value');
    });
  });

  describe('removeItem function', () => {
    it('should call if localStorage is supported', () => {
      const apiMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn().mockReturnValue(true),
      };

      const localStorageRepository = getLocalStorageRepository(apiMock);

      localStorageRepository.removeItem('key');

      expect(apiMock.removeItem).toHaveBeenCalledWith('key');
    });
  });
});
