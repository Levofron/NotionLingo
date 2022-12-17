import { functionImportTest } from '@infrastructure/utils';

import { createDevToolsClient } from './create-dev-tools-client.function';

const consoleMock = jest.fn();
const originalConsoleLog = console.log;

describe('createDevToolsClient function', () => {
  functionImportTest(createDevToolsClient);

  beforeAll(() => {
    console.log = consoleMock;
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  afterEach(() => {
    // @ts-expect-error
    delete window.rest;

    // @ts-expect-error
    delete window.supabase;
  });

  it('should assign supabase module to window object', () => {
    createDevToolsClient();

    expect(window).toHaveProperty('supabase');

    // @ts-expect-error
    expect(window.supabase).toEqual({
      logout: expect.any(Function),
      getUser: expect.any(Function),
      getSession: expect.any(Function),
      loginViaGoogle: expect.any(Function),
      onAuthStateChange: expect.any(Function),
    });

    expect(consoleMock).toHaveBeenCalled();
  });

  it('should assign rest module to window object', () => {
    createDevToolsClient();

    expect(window).toHaveProperty('rest');

    // @ts-expect-error
    expect(window.rest).toEqual({
      healthCheck: expect.any(Function),
      getLoggedUser: expect.any(Function),
      setNotionPageId: expect.any(Function),
      setNotionApiToken: expect.any(Function),
      setSupabaseCookie: expect.any(Function),
      getRandomNotionWords: expect.any(Function),
      getAvailableNotionPages: expect.any(Function),
    });

    expect(consoleMock).toHaveBeenCalled();
  });

  it('should not assign supabase or rest module if environemt is not local or test', () => {
    const originalEnv = process.env.NEXT_PUBLIC_APP_ENV;

    process.env.NEXT_PUBLIC_APP_ENV = 'production';

    createDevToolsClient();

    expect(window).not.toHaveProperty('supabase');
    expect(window).not.toHaveProperty('rest');

    process.env.NEXT_PUBLIC_APP_ENV = originalEnv;
  });
});
