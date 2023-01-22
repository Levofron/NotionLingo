import { localStorageModule } from './local-storage.module';

describe('localStorageModule object', () => {
  it('should return proper object', () => {
    expect(localStorageModule).toEqual({
      getItem: expect.any(Function),
      setItem: expect.any(Function),
      removeItem: expect.any(Function),
      isSupported: expect.any(Function),
    });
  });
});
