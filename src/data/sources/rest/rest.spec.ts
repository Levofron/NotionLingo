import { IContact, IHash, INotionPage, INotionWord, IUser } from '@domain/rest/rest.models';

import { functionImportTest } from '@infrastructure/utils';

import { getRestSource } from './rest.source';

describe('getRestSource function', () => {
  functionImportTest(getRestSource);

  it('should return proper object', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axiosInstanceMock: any = {};

    const restSource = getRestSource(axiosInstanceMock);

    expect(restSource).toEqual({
      healthCheck: expect.any(Function),
      setSupabaseCookie: expect.any(Function),
      getLoggedUser: expect.any(Function),
      setNotionApiToken: expect.any(Function),
      getAvailableNotionPages: expect.any(Function),
      setNotionPageId: expect.any(Function),
      getRandomNotionWords: expect.any(Function),
      sendContactFormData: expect.any(Function),
    });
  });

  describe('healthCheck endpoint', () => {
    it('should call proper endpoint and return current date', () => {
      const nowDate = new Date();
      const isoDate = nowDate.toISOString();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockResolvedValue({ data: isoDate }),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.healthCheck();

      expect(result).resolves.toEqual({ data: isoDate });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/health-check');
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.healthCheck();

      expect(result).rejects.toThrow('error');
    });
  });

  describe('setSupabaseCookie endpoint', () => {
    it('should call proper endpoint with SIGNED_OUT event', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockResolvedValue(undefined),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.setSupabaseCookie(null);

      expect(result).resolves.toBeUndefined();
      expect(axiosInstanceMock.post).toHaveBeenCalledWith('/set-supabase-cookie', {
        event: 'SIGNED_OUT',
        session: null,
      });
    });

    it('should call proper endpoint with SIGNED_IN event', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockResolvedValue(undefined),
      };

      const restSource = getRestSource(axiosInstanceMock);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = restSource.setSupabaseCookie({} as any);

      expect(result).resolves.toBeUndefined();
      expect(axiosInstanceMock.post).toHaveBeenCalledWith('/set-supabase-cookie', {
        event: 'SIGNED_IN',
        session: {},
      });
    });
  });

  describe('getLoggedUser endpoint', () => {
    const userMock: IUser = {
      id: 'id',
      email: 'email',
      hasNotionData: true,
      fullName: 'fullName',
      avatarUrl: 'avatarUrl',
      createdAt: 'createdAt',
    };

    it('should call proper endpoint and return user data', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockResolvedValue({ data: userMock }),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.getLoggedUser();

      expect(result).resolves.toEqual({ data: userMock });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/profile/logged');
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.getLoggedUser();

      expect(result).rejects.toThrow('error');
    });
  });

  describe('getRandomNotionWords endpoint', () => {
    const notionWordMock: INotionWord = {
      word: 'word',
      meaning: 'meaning',
      exampleSentence: 'exampleSentence',
    };

    it('should call proper endpoint and return five notion words', () => {
      const fiveNotionWords = Array.from({ length: 5 }, () => notionWordMock);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockResolvedValue({ data: fiveNotionWords }),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.getRandomNotionWords();

      expect(result).resolves.toEqual({ data: fiveNotionWords });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/notion/random-words');
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.getRandomNotionWords();

      expect(result).rejects.toThrow('error');
    });
  });

  describe('setNotionApiToken endpoint', () => {
    it('should call proper endpoint with proper data', () => {
      const hashMock: IHash = {
        iv: 'iv',
        content: 'content',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockResolvedValue({ data: hashMock }),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.setNotionApiToken('token');

      expect(result).resolves.toEqual({ data: hashMock });
      expect(axiosInstanceMock.post).toHaveBeenCalledWith('/notion/set-api-token', {
        token: 'token',
      });
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.setNotionApiToken('token');

      expect(result).rejects.toThrow('error');
    });
  });

  describe('getAvailableNotionPages endpoint', () => {
    const notionPageMock: INotionPage = {
      id: 'id',
      url: 'url',
      title: 'title',
      createdTime: 'createdTime',
      lastEditedTime: 'lastEditedTime',
    };

    it('should call proper endpoint and return available notion pages', () => {
      const availableNotionPages = [notionPageMock];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockResolvedValue({ data: availableNotionPages }),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.getAvailableNotionPages();

      expect(result).resolves.toEqual({ data: availableNotionPages });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/notion/available-pages');
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.getAvailableNotionPages();

      expect(result).rejects.toThrow('error');
    });
  });

  describe('setNotionPageId endpoint', () => {
    it('should call proper endpoint with proper data', () => {
      const pageId = '05805c32-7393-44fe-9cf8-0f91b42f8bf5';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockResolvedValue({ data: pageId }),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.setNotionPageId('pageId');

      expect(result).resolves.toEqual({ data: pageId });
      expect(axiosInstanceMock.post).toHaveBeenCalledWith('/notion/set-page-id', {
        pageId: 'pageId',
      });
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.setNotionPageId('pageId');

      expect(result).rejects.toThrow('error');
    });
  });

  describe('sendContactFormData endpoint', () => {
    it('should call proper endpoint with proper data', () => {
      const contactFormDataMock: IContact = {
        name: 'name',
        email: 'email',
        message: 'message',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockResolvedValue({ data: contactFormDataMock }),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.sendContactFormData(contactFormDataMock);

      expect(result).resolves.toEqual({ data: contactFormDataMock });
      expect(axiosInstanceMock.post).toHaveBeenCalledWith('/contact', contactFormDataMock);
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restSource = getRestSource(axiosInstanceMock);

      const result = restSource.sendContactFormData({
        name: 'name',
        email: 'email',
        message: 'message',
      });

      expect(result).rejects.toThrow('error');
    });
  });
});
