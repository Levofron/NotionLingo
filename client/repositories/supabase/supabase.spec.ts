import { functionImportTest } from '@infrastructure/functions';

import { getSupabaseRepository } from './supabase.repository';

describe('getSupabaseRepository function', () => {
  functionImportTest(getSupabaseRepository);

  it('should return proper object', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseApiMock: any = {};

    const supabaseRepository = getSupabaseRepository(supabaseApiMock);

    expect(supabaseRepository).toEqual({
      logout: expect.any(Function),
      getUser: expect.any(Function),
      getSession: expect.any(Function),
      onAuthStateChange: expect.any(Function),
      loginViaMagicLink: expect.any(Function),
    });
  });

  describe('loginViaMagicLink function', () => {
    it('should call signIn function with proper params', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {
        signIn: jest.fn(),
      };

      const supabaseRepository = getSupabaseRepository(supabaseApiMock);

      await supabaseRepository.loginViaMagicLink('test');

      expect(supabaseApiMock.signIn).toHaveBeenCalledWith({ email: 'test' });
    });
  });

  describe('logout function', () => {
    it('should call logout function', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {
        logout: jest.fn(),
      };

      const supabaseRepository = await getSupabaseRepository(supabaseApiMock);

      supabaseRepository.logout();

      expect(supabaseApiMock.logout).toHaveBeenCalled();
    });
  });

  describe('getUser function', () => {
    it('should call getUser function', () => {
      const userMock = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {
        getUser: jest.fn().mockReturnValue(userMock),
      };

      const supabaseRepository = getSupabaseRepository(supabaseApiMock);

      const result = supabaseRepository.getUser();

      expect(result).toEqual(userMock);
      expect(supabaseApiMock.getUser).toHaveBeenCalled();
    });
  });

  describe('getSession function', () => {
    it('should call getSession function', () => {
      const sessionMock = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {
        getSession: jest.fn().mockReturnValue(sessionMock),
      };

      const supabaseRepository = getSupabaseRepository(supabaseApiMock);

      const result = supabaseRepository.getSession();

      expect(result).toEqual(sessionMock);
      expect(supabaseApiMock.getSession).toHaveBeenCalled();
    });
  });

  describe('onAuthStateChange function', () => {
    it('should call onAuthStateChange function', () => {
      const callbackMock = jest.fn();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {
        onAuthStateChange: jest.fn(),
      };

      const supabaseRepository = getSupabaseRepository(supabaseApiMock);

      supabaseRepository.onAuthStateChange(callbackMock);

      expect(supabaseApiMock.onAuthStateChange).toHaveBeenCalledWith(callbackMock);
    });
  });
});
