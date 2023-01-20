import { filterOutObjectKeys, functionImportTest } from '@infrastructure/utils';

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
    // eslint-disable-next-line no-global-assign
    window = filterOutObjectKeys(window, ['rest', 'supabase']);
  });

  it('should assign supabase module to window object', () => {
    createDevToolsClient();

    expect(window).toHaveProperty('supabase');

    // @ts-expect-error
    expect(window.supabase).toStrictEqual({
      logout: expect.any(Function),
      getUser: expect.any(Function),
      getSession: expect.any(Function),
      loginViaGoogle: expect.any(Function),
      onAuthStateChange: expect.any(Function),
    });
  });

  it('should assign rest module to window object', () => {
    createDevToolsClient();

    expect(window).toHaveProperty('rest');

    // @ts-expect-error
    expect(window.rest).toStrictEqual({
      healthCheck: expect.any(Function),
      getLoggedUser: expect.any(Function),
      setNotionPageId: expect.any(Function),
      setNotionApiToken: expect.any(Function),
      setSupabaseCookie: expect.any(Function),
      sendContactFormData: expect.any(Function),
      increaseDailyStreak: expect.any(Function),
      getRandomNotionWords: expect.any(Function),
      getAvailableNotionPages: expect.any(Function),
    });
  });

  it('should assign synthesis module to window object', () => {
    createDevToolsClient();

    expect(window).toHaveProperty('synthesis');

    // @ts-expect-error
    expect(window.rest).toStrictEqual({
      healthCheck: expect.any(Function),
      getLoggedUser: expect.any(Function),
      setNotionPageId: expect.any(Function),
      setNotionApiToken: expect.any(Function),
      setSupabaseCookie: expect.any(Function),
      sendContactFormData: expect.any(Function),
      increaseDailyStreak: expect.any(Function),
      getRandomNotionWords: expect.any(Function),
      getAvailableNotionPages: expect.any(Function),
    });
  });
});
