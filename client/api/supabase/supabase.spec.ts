import { functionImportTest } from '@infrastructure/utils';

import { getSupabaseApi } from './supabase.api';

describe('getSupabaseApi function', () => {
  functionImportTest(getSupabaseApi);

  it('should return proper object', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseInstanceMock: any = {};

    const supabaseApi = getSupabaseApi(supabaseInstanceMock);

    expect(supabaseApi).toEqual({
      signIn: expect.any(Function),
      logout: expect.any(Function),
      getUser: expect.any(Function),
      getSession: expect.any(Function),
      onAuthStateChange: expect.any(Function),
    });
  });

  it('should call signIn with proper params', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseInstanceMock: any = {
      auth: {
        signIn: jest.fn(),
      },
    };

    const supabaseApi = getSupabaseApi(supabaseInstanceMock);

    supabaseApi.signIn({ provider: 'google' });

    expect(supabaseInstanceMock.auth.signIn).toHaveBeenCalledWith({
      provider: 'google',
    });
  });

  it('should call logout', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseInstanceMock: any = {
      auth: {
        signOut: jest.fn(),
      },
    };

    const supabaseApi = getSupabaseApi(supabaseInstanceMock);

    supabaseApi.logout();

    expect(supabaseInstanceMock.auth.signOut).toHaveBeenCalled();
  });

  it('should call getUser', () => {
    const userMock = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseInstanceMock: any = {
      auth: {
        user: jest.fn().mockReturnValue(userMock),
      },
    };

    const supabaseApi = getSupabaseApi(supabaseInstanceMock);

    supabaseInstanceMock.auth.user.mockReturnValue(userMock);

    const user = supabaseApi.getUser();

    expect(user).toEqual(userMock);
  });

  it('should call getSession', () => {
    const sessionMock = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseInstanceMock: any = {
      auth: {
        session: jest.fn().mockReturnValue(sessionMock),
      },
    };

    const supabaseApi = getSupabaseApi(supabaseInstanceMock);

    supabaseInstanceMock.auth.session.mockReturnValue(sessionMock);

    const session = supabaseApi.getSession();

    expect(session).toEqual(sessionMock);
  });

  it('should call onAuthStateChange', async () => {
    const callbackMock = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseInstanceMock: any = {
      auth: {
        onAuthStateChange: jest.fn(),
      },
    };

    const supabaseApi = getSupabaseApi(supabaseInstanceMock);

    supabaseApi.onAuthStateChange(callbackMock);

    expect(supabaseInstanceMock.auth.onAuthStateChange).toHaveBeenCalledWith(callbackMock);
  });
});
