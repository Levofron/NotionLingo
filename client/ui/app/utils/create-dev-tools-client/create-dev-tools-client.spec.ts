import { filterOutObjectKeys, functionImportTest } from '@infrastructure/utils';

import { createDevToolsClient } from './create-dev-tools-client.function';

describe('createDevToolsClient function', () => {
  functionImportTest(createDevToolsClient);

  afterEach(() => {
    // @ts-expect-error
    // eslint-disable-next-line no-global-assign
    window = filterOutObjectKeys(window, ['rest', 'supabase', 'synthesis', 'memory']);
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
      deleteProfile: expect.any(Function),
      getLoggedProfile: expect.any(Function),
      updateNotionWord: expect.any(Function),
      createNotionWord: expect.any(Function),
      setNotionApiToken: expect.any(Function),
      setSupabaseCookie: expect.any(Function),
      sendContactFormData: expect.any(Function),
      increaseDailyStreak: expect.any(Function),
      setNotionDatabaseId: expect.any(Function),
      getRandomNotionWords: expect.any(Function),
      getNotionTableColumns: expect.any(Function),
      resetNotionIntegration: expect.any(Function),
      getDictionarySuggestions: expect.any(Function),
      getAvailableNotionDatabases: expect.any(Function),
    });
  });

  it('should assign synthesis module to window object', () => {
    createDevToolsClient();

    expect(window).toHaveProperty('synthesis');

    // @ts-expect-error
    expect(window.synthesis).toStrictEqual({
      speak: expect.any(Function),
      cancel: expect.any(Function),
      getRate: expect.any(Function),
      setRate: expect.any(Function),
      getPitch: expect.any(Function),
      getVoice: expect.any(Function),
      setVoice: expect.any(Function),
      setPitch: expect.any(Function),
      getVolume: expect.any(Function),
      setVolume: expect.any(Function),
      getVoices: expect.any(Function),
      isSupported: expect.any(Function),
      onVoicesChanged: expect.any(Function),
    });
  });

  it('should assign memory module to window object', () => {
    createDevToolsClient();

    expect(window).toHaveProperty('memory');

    // @ts-expect-error
    expect(window.memory).toStrictEqual({
      getItem: expect.any(Function),
      setItem: expect.any(Function),
      removeItem: expect.any(Function),
      isSupported: expect.any(Function),
    });
  });
});
