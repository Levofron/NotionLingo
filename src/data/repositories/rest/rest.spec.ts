import { IContact } from '@domain/rest/rest.models';

import { functionImportTest } from '@infrastructure/utils';

import { getRestRepository } from './rest.repository';

describe('getRestRepository function', () => {
  functionImportTest(getRestRepository);

  it('should return proper object', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const restSourceMock: any = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseSourceMock: any = {};

    const restRepository = getRestRepository(restSourceMock, supabaseSourceMock);

    expect(restRepository).toEqual({
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

  describe('healthCheck function', () => {
    it('should call proper restSource function', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restSourceMock: any = {
        healthCheck: jest.fn().mockResolvedValue({ data: 'data' }),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {};

      const restRepository = getRestRepository(restSourceMock, supabaseSourceMock);

      const result = restRepository.healthCheck();

      expect(result).resolves.toEqual('data');
      expect(restSourceMock.healthCheck).toHaveBeenCalled();
    });
  });

  describe('setSupabaseCookie function', () => {
    it('should call proper restSource function', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restSourceMock: any = {
        setSupabaseCookie: jest.fn().mockResolvedValue({ data: 'data' }),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {
        getSession: jest.fn().mockResolvedValue({ data: 'data' }),
      };

      const restRepository = getRestRepository(restSourceMock, supabaseSourceMock);

      const result = await restRepository.setSupabaseCookie();

      expect(result).toBeUndefined();
      expect(supabaseSourceMock.getSession).toHaveBeenCalled();
      expect(restSourceMock.setSupabaseCookie).toHaveBeenCalledWith({ data: 'data' });
    });
  });

  describe('getLoggedUser function', () => {
    it('should call proper restSource function', async () => {
      const userMock = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restSourceMock: any = {
        getLoggedUser: jest.fn().mockResolvedValue({ data: userMock }),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {};

      const restRepository = getRestRepository(restSourceMock, supabaseSourceMock);

      const result = await restRepository.getLoggedUser();

      expect(result).toEqual(userMock);
      expect(restSourceMock.getLoggedUser).toHaveBeenCalled();
    });
  });

  describe('setNotionApiToken function', () => {
    it('should call proper restSource function', async () => {
      const token = 'token';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restSourceMock: any = {
        setNotionApiToken: jest.fn().mockImplementation((token) => ({ data: token })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {};

      const restRepository = getRestRepository(restSourceMock, supabaseSourceMock);

      const result = await restRepository.setNotionApiToken(token);

      expect(result).toEqual(token);
      expect(restSourceMock.setNotionApiToken).toHaveBeenCalledWith(token);
    });
  });

  describe('getAvailableNotionPages function', () => {
    it('should call proper restSource function', async () => {
      const pages = [{ id: 'id', title: 'title' }];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restSourceMock: any = {
        getAvailableNotionPages: jest.fn().mockImplementation(() => ({ data: pages })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {};

      const restRepository = getRestRepository(restSourceMock, supabaseSourceMock);

      const result = await restRepository.getAvailableNotionPages();

      expect(result).toEqual(pages);
      expect(restSourceMock.getAvailableNotionPages).toHaveBeenCalled();
    });
  });

  describe('setNotionPageId function', () => {
    it('should call proper restSource function', async () => {
      const pageId = 'pageId';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restSourceMock: any = {
        setNotionPageId: jest.fn().mockImplementation((pageId) => ({ data: pageId })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {};

      const restRepository = getRestRepository(restSourceMock, supabaseSourceMock);

      const result = await restRepository.setNotionPageId(pageId);

      expect(result).toEqual(pageId);
      expect(restSourceMock.setNotionPageId).toHaveBeenCalledWith(pageId);
    });
  });

  describe('getRandomNotionWords function', () => {
    it('should call proper restSource function', async () => {
      const words = [{ word: 'word', translation: 'translation, TEST     ' }];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restSourceMock: any = {
        getRandomNotionWords: jest.fn().mockImplementation(() => ({ data: words })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {};

      const restRepository = getRestRepository(restSourceMock, supabaseSourceMock);

      const result = await restRepository.getRandomNotionWords();

      expect(result).toEqual([
        {
          word: 'Word',
          translation: 'Translation, test',
          imageUrl: 'https://api.unsplash.com/search/photos?query=Word',
        },
      ]);
      expect(restSourceMock.getRandomNotionWords).toHaveBeenCalled();
    });
  });

  describe('sendContactFormData function', () => {
    it('should call proper restSource function', async () => {
      const formData: IContact = {
        name: 'name',
        email: 'email',
        message: 'message',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restSourceMock: any = {
        sendContactFormData: jest.fn().mockImplementation(() => ({ data: formData })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {};

      const restRepository = getRestRepository(restSourceMock, supabaseSourceMock);

      const result = await restRepository.sendContactFormData(formData);

      expect(result).toEqual(formData);
      expect(restSourceMock.sendContactFormData).toHaveBeenCalledWith(formData);
    });
  });

  describe('increaseDailyStreak function', () => {
    it('should call proper restSource function', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restSourceMock: any = {
        increaseDailyStreak: jest.fn().mockImplementation(() => ({ data: {} })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseSourceMock: any = {};

      const restRepository = getRestRepository(restSourceMock, supabaseSourceMock);

      const result = await restRepository.increaseDailyStreak();

      expect(result).toEqual({});
      expect(restSourceMock.increaseDailyStreak).toHaveBeenCalled();
    });
  });
});
