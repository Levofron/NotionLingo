import { functionImportTest } from '@utils';

import { getSupabaseSource } from './supabase.source';

describe('getSupabaseSource function', () => {
  functionImportTest(getSupabaseSource);

  it('should return proper object', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseInstanceMock: any = {};

    const supabaseSource = getSupabaseSource(supabaseInstanceMock);

    expect(supabaseSource).toEqual({
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

    const supabaseSource = getSupabaseSource(supabaseInstanceMock);

    supabaseSource.signIn('google');

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

    const supabaseSource = getSupabaseSource(supabaseInstanceMock);

    supabaseSource.logout();

    expect(supabaseInstanceMock.auth.signOut).toHaveBeenCalled();
  });

  it('should call getUser', async () => {
    const userMock = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseInstanceMock: any = {
      auth: {
        user: jest.fn().mockReturnValue(userMock),
      },
    };

    const supabaseSource = getSupabaseSource(supabaseInstanceMock);

    supabaseInstanceMock.auth.user.mockReturnValue(userMock);

    const user = await supabaseSource.getUser();

    expect(user).toEqual(userMock);
  });

  it('should call getSession', async () => {
    const sessionMock = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseInstanceMock: any = {
      auth: {
        session: jest.fn().mockReturnValue(sessionMock),
      },
    };

    const supabaseSource = getSupabaseSource(supabaseInstanceMock);

    supabaseInstanceMock.auth.session.mockReturnValue(sessionMock);

    const session = await supabaseSource.getSession();

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

    const supabaseSource = getSupabaseSource(supabaseInstanceMock);

    supabaseSource.onAuthStateChange(callbackMock);

    expect(supabaseInstanceMock.auth.onAuthStateChange).toHaveBeenCalledWith(callbackMock);
  });
});
