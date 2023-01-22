import { functionImportTest } from '@infrastructure/utils';

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
      const sourceMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn().mockReturnValue(true),
      };

      const localStorageRepository = getLocalStorageRepository(sourceMock);

      localStorageRepository.getItem('key');

      expect(sourceMock.getItem).toHaveBeenCalledWith('key');
    });

    it('should not call if localStorage is not supported', () => {
      const sourceMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn().mockReturnValue(false),
      };

      const localStorageRepository = getLocalStorageRepository(sourceMock);

      localStorageRepository.getItem('key');

      expect(sourceMock.getItem).not.toHaveBeenCalled();
    });
  });

  describe('setItem function', () => {
    it('should call if localStorage is supported', () => {
      const sourceMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn().mockReturnValue(true),
      };

      const localStorageRepository = getLocalStorageRepository(sourceMock);

      localStorageRepository.setItem('key', 'value');

      expect(sourceMock.setItem).toHaveBeenCalledWith('key', 'value');
    });

    it('should not call if localStorage is not supported', () => {
      const sourceMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn().mockReturnValue(false),
      };

      const localStorageRepository = getLocalStorageRepository(sourceMock);

      localStorageRepository.setItem('key', 'value');

      expect(sourceMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe('removeItem function', () => {
    it('should call if localStorage is supported', () => {
      const sourceMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn().mockReturnValue(true),
      };

      const localStorageRepository = getLocalStorageRepository(sourceMock);

      localStorageRepository.removeItem('key');

      expect(sourceMock.removeItem).toHaveBeenCalledWith('key');
    });

    it('should not call if localStorage is not supported', () => {
      const sourceMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        isSupported: jest.fn().mockReturnValue(false),
      };

      const localStorageRepository = getLocalStorageRepository(sourceMock);

      localStorageRepository.removeItem('key');

      expect(sourceMock.removeItem).not.toHaveBeenCalled();
    });
  });
});
