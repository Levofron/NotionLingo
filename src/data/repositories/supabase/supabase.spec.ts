import { functionImportTest } from '@infrastructure';

import { getSupabaseRepository } from './supabase.repository';

describe('getSupabaseRepository function', () => {
  functionImportTest(getSupabaseRepository);

  it('should return proper object', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseSourceMock: any = {};

    const supabaseRepository = getSupabaseRepository(supabaseSourceMock);

    expect(supabaseRepository).toEqual({
      loginViaGoogle: expect.any(Function),
      logout: expect.any(Function),
      getUser: expect.any(Function),
      getSession: expect.any(Function),
      onAuthStateChange: expect.any(Function),
    });
  });

  describe('loginViaGoogle function', () => {
    it('should call signIn function with proper params', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {
        signIn: jest.fn(),
      };

      const supabaseRepository = getSupabaseRepository(supabaseSourceMock);

      await supabaseRepository.loginViaGoogle();

      expect(supabaseSourceMock.signIn).toHaveBeenCalledWith('google');
    });
  });

  describe('logout function', () => {
    it('should call logout function', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {
        logout: jest.fn(),
      };

      const supabaseRepository = await getSupabaseRepository(supabaseSourceMock);

      supabaseRepository.logout();

      expect(supabaseSourceMock.logout).toHaveBeenCalled();
    });
  });

  describe('getUser function', () => {
    it('should call getUser function', async () => {
      const userMock = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {
        getUser: jest.fn().mockReturnValue(userMock),
      };

      const supabaseRepository = getSupabaseRepository(supabaseSourceMock);

      const result = await supabaseRepository.getUser();

      expect(result).toEqual(userMock);
      expect(supabaseSourceMock.getUser).toHaveBeenCalled();
    });
  });

  describe('getSession function', () => {
    it('should call getSession function', async () => {
      const sessionMock = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {
        getSession: jest.fn().mockReturnValue(sessionMock),
      };

      const supabaseRepository = getSupabaseRepository(supabaseSourceMock);

      const result = await supabaseRepository.getSession();

      expect(result).toEqual(sessionMock);
      expect(supabaseSourceMock.getSession).toHaveBeenCalled();
    });
  });

  describe('onAuthStateChange function', () => {
    it('should call onAuthStateChange function', async () => {
      const callbackMock = jest.fn();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {
        onAuthStateChange: jest.fn(),
      };

      const supabaseRepository = getSupabaseRepository(supabaseSourceMock);

      supabaseRepository.onAuthStateChange(callbackMock);

      expect(supabaseSourceMock.onAuthStateChange).toHaveBeenCalledWith(callbackMock);
    });
  });
});
