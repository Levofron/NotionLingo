import { restModule } from './rest.module';

describe('restModule object', () => {
  it('should return proper object', () => {
    expect(restModule).toEqual({
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
});
