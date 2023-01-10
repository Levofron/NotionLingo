import { restModule } from './rest.module';

describe('restModule object', () => {
  it('should return proper object', () => {
    expect(restModule).toEqual({
      healthCheck: expect.any(Function),
      getLoggedUser: expect.any(Function),
      setNotionPageId: expect.any(Function),
      setNotionApiToken: expect.any(Function),
      setSupabaseCookie: expect.any(Function),
      sendContactFormData: expect.any(Function),
      getRandomNotionWords: expect.any(Function),
      getAvailableNotionPages: expect.any(Function),
    });
  });
});
