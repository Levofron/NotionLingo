import { IContact, IHash, INotionDatabase, INotionWord, IProfile } from '@domain/rest/rest.models';

import { functionImportTest } from '@infrastructure/functions';

import { getRestApi } from './rest.api';

describe('getRestApi function', () => {
  functionImportTest(getRestApi);

  it('should return proper object', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axiosInstanceMock: any = {};

    const restApi = getRestApi(axiosInstanceMock);

    expect(restApi).toEqual({
      healthCheck: expect.any(Function),
      deleteProfile: expect.any(Function),
      updateNotionWord: expect.any(Function),
      getLoggedProfile: expect.any(Function),
      createNotionWord: expect.any(Function),
      setNotionApiToken: expect.any(Function),
      setSupabaseCookie: expect.any(Function),
      getDictionarySuggestions: expect.any(Function),
      sendContactFormData: expect.any(Function),
      increaseDailyStreak: expect.any(Function),
      setNotionDatabaseId: expect.any(Function),
      getRandomNotionWords: expect.any(Function),
      getNotionTableColumns: expect.any(Function),
      resetNotionIntegration: expect.any(Function),
      getAvailableNotionDatabases: expect.any(Function),
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

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.healthCheck();

      expect(result).resolves.toEqual({ data: isoDate });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/health-check');
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.healthCheck();

      expect(result).rejects.toThrow('error');
    });
  });

  describe('setSupabaseCookie endpoint', () => {
    it('should call proper endpoint with SIGNED_OUT event', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockResolvedValue(undefined),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.setSupabaseCookie(null);

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

      const restApi = getRestApi(axiosInstanceMock);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = restApi.setSupabaseCookie({} as any);

      expect(result).resolves.toBeUndefined();
      expect(axiosInstanceMock.post).toHaveBeenCalledWith('/set-supabase-cookie', {
        event: 'SIGNED_IN',
        session: {},
      });
    });
  });

  describe('getLoggedProfile endpoint', () => {
    const userMock: IProfile = {
      email: 'email',
      daysInStreak: 1,
      todayWordsStreak: 1,
      hasNotionData: true,
      totalLearnedWords: 1,
      fullName: 'fullName',
      avatarUrl: 'avatarUrl',
      createdAt: 'createdAt',
    };

    it('should call proper endpoint and return user data', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockResolvedValue({ data: userMock }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.getLoggedProfile();

      expect(result).resolves.toEqual({ data: userMock });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/profile/logged');
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.getLoggedProfile();

      expect(result).rejects.toThrow('error');
    });
  });

  describe('getRandomNotionWords endpoint', () => {
    const notionWordMock: INotionWord = {
      id: 'id',
      ipa: 'ipa',
      word: 'word',
      type: 'type',
      meaning: 'meaning',
      imageUrl: 'imageUrl',
      exampleSentence: 'exampleSentence',
      meaningSuggestion: 'meaningSuggestion',
      exampleSentenceSuggestion: 'exampleSentenceSuggestion',
    };

    it('should call proper endpoint and return five notion words', () => {
      const fiveNotionWords = Array.from({ length: 5 }, () => notionWordMock);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockResolvedValue({ data: fiveNotionWords }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.getRandomNotionWords();

      expect(result).resolves.toEqual({ data: fiveNotionWords });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/notion/random-words');
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.getRandomNotionWords();

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

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.setNotionApiToken('token');

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

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.setNotionApiToken('token');

      expect(result).rejects.toThrow('error');
    });
  });

  describe('getAvailableNotionDatabases endpoint', () => {
    const notionDatabaseMock: INotionDatabase = {
      id: 'id',
      url: 'url',
      title: 'title',
      createdTime: 'createdTime',
      lastEditedTime: 'lastEditedTime',
    };

    it('should call proper endpoint and return available notion databases', () => {
      const availableNotionDatabases = [notionDatabaseMock];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockResolvedValue({ data: availableNotionDatabases }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.getAvailableNotionDatabases();

      expect(result).resolves.toEqual({ data: availableNotionDatabases });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/notion/available-databases');
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.getAvailableNotionDatabases();

      expect(result).rejects.toThrow('error');
    });
  });

  describe('setNotionDatabaseId endpoint', () => {
    it('should call proper endpoint with proper data', () => {
      const databaseId = '05805c32-7393-44fe-9cf8-0f91b42f8bf5';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockResolvedValue({ data: databaseId }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.setNotionDatabaseId('databaseId');

      expect(result).resolves.toEqual({ data: databaseId });
      expect(axiosInstanceMock.post).toHaveBeenCalledWith('/notion/set-database-id', {
        databaseId: 'databaseId',
      });
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.setNotionDatabaseId('databaseId');

      expect(result).rejects.toThrow('error');
    });
  });

  describe('sendContactFormData endpoint', () => {
    it('should call proper endpoint with proper data', () => {
      const contactFormDataMock: IContact = {
        email: 'email',
        message: 'message',
        fullName: 'fullName',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockResolvedValue({ data: contactFormDataMock }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.sendContactFormData(contactFormDataMock);

      expect(result).resolves.toEqual({ data: contactFormDataMock });
      expect(axiosInstanceMock.post).toHaveBeenCalledWith('/contact', contactFormDataMock);
    });

    it('should throw error if endpoint fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.sendContactFormData({
        email: 'email',
        message: 'message',
        fullName: 'fullName',
      });

      expect(result).rejects.toThrow('error');
    });
  });

  describe('increaseDailyStreak endpoint', () => {
    it('should call proper endpoint', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockResolvedValue({ data: {} }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.increaseDailyStreak();

      expect(result).resolves.toEqual({ data: {} });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith(
        expect.stringContaining('/profile/increase-daily-streak?currentDate='),
      );
    });

    it('should throw error if endpoint fails', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.increaseDailyStreak();

      expect(result).rejects.toThrow('error');
    });
  });

  describe('resetNotionIntegration endpoint', () => {
    it('should call proper endpoint', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockResolvedValue({ data: {} }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.resetNotionIntegration();

      expect(result).resolves.toEqual({ data: {} });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/profile/reset-notion-integration');
    });

    it('should throw error if endpoint fails', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.resetNotionIntegration();

      expect(result).rejects.toThrow('error');
    });
  });

  describe('deleteProfile endpoint', () => {
    it('should call proper endpoint', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        delete: jest.fn().mockResolvedValue({ data: {} }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.deleteProfile();

      expect(result).resolves.toEqual({ data: {} });
      expect(axiosInstanceMock.delete).toHaveBeenCalledWith('/profile/delete');
    });

    it('should throw error if endpoint fails', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        delete: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.deleteProfile();

      expect(result).rejects.toThrow('error');
    });
  });

  describe('getDictionarySuggestions endpoint', () => {
    it('should call proper endpoint', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockResolvedValue({ data: {} }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.getDictionarySuggestions('suit up');

      expect(result).resolves.toEqual({ data: {} });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/dictionary/find?word=suit%20up');
    });

    it('should throw error if endpoint fails', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.getDictionarySuggestions('word');

      expect(result).rejects.toThrow('error');
    });
  });

  describe('updateNotionWord endpoint', () => {
    it('should call proper endpoint', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockResolvedValue({ data: {} }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.updateNotionWord({ id: 'id', meaning: 'meaning' });

      expect(result).resolves.toEqual({ data: {} });
      expect(axiosInstanceMock.post).toHaveBeenCalledWith('/notion/update', {
        id: 'id',
        meaning: 'meaning',
      });
    });

    it('should throw error if endpoint fails', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.updateNotionWord({ id: 'id', meaning: 'meaning' });

      expect(result).rejects.toThrow('error');
    });
  });

  describe('getNotionTableColumns endpoint', () => {
    it('should call proper endpoint', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockResolvedValue({ data: {} }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.getNotionTableColumns();

      expect(result).resolves.toEqual({ data: {} });
      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/notion/table-columns');
    });

    it('should throw error if endpoint fails', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        get: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.getNotionTableColumns();

      expect(result).rejects.toThrow('error');
    });
  });

  describe('createNotionWord endpoint', () => {
    it('should call proper endpoint', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockResolvedValue({ data: {} }),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.createNotionWord({ word: 'word', meaning: 'meaning' });

      expect(result).resolves.toEqual({ data: {} });
      expect(axiosInstanceMock.post).toHaveBeenCalledWith('/notion/create', {
        word: 'word',
        meaning: 'meaning',
      });
    });

    it('should throw error if endpoint fails', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosInstanceMock: any = {
        post: jest.fn().mockRejectedValue(new Error('error')),
      };

      const restApi = getRestApi(axiosInstanceMock);

      const result = restApi.createNotionWord({ word: 'word', meaning: 'meaning' });

      expect(result).rejects.toThrow('error');
    });
  });
});
