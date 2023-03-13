import { IContact } from '@domain/entities/rest.types';

import { functionImportTest } from '@infrastructure/utils';

import { getRestRepository } from './rest.repository';

describe('getRestRepository function', () => {
  functionImportTest(getRestRepository);

  it('should return proper object', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const restApiMock: any = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseApiMock: any = {};

    const restRepository = getRestRepository(restApiMock, supabaseApiMock);

    expect(restRepository).toEqual({
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

  describe('healthCheck function', () => {
    it('should call proper restApi function', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        healthCheck: jest.fn().mockResolvedValue({ data: 'data' }),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      const result = restRepository.healthCheck();

      expect(result).resolves.toEqual('data');
      expect(restApiMock.healthCheck).toHaveBeenCalled();
    });
  });

  describe('setSupabaseCookie function', () => {
    it('should call proper restApi function', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        setSupabaseCookie: jest.fn().mockResolvedValue({ data: 'data' }),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {
        getSession: jest.fn().mockResolvedValue({ data: 'data' }),
      };

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      const result = await restRepository.setSupabaseCookie();

      expect(result).toBeUndefined();
      expect(supabaseApiMock.getSession).toHaveBeenCalled();
      expect(restApiMock.setSupabaseCookie).toHaveBeenCalledWith({ data: 'data' });
    });
  });

  describe('getLoggedProfile function', () => {
    it('should call proper restApi function', async () => {
      const userMock = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        getLoggedProfile: jest.fn().mockResolvedValue({ data: userMock }),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      const result = await restRepository.getLoggedProfile();

      expect(result).toEqual(userMock);
      expect(restApiMock.getLoggedProfile).toHaveBeenCalled();
    });
  });

  describe('setNotionApiToken function', () => {
    it('should call proper restApi function', async () => {
      const token = 'token';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        setNotionApiToken: jest.fn().mockImplementation((token) => ({ data: token })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      const result = await restRepository.setNotionApiToken(token);

      expect(result).toEqual(token);
      expect(restApiMock.setNotionApiToken).toHaveBeenCalledWith(token);
    });
  });

  describe('getAvailableNotionDatabases function', () => {
    it('should call proper restApi function', async () => {
      const pages = [{ id: 'id', title: 'title' }];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        getAvailableNotionDatabases: jest.fn().mockImplementation(() => ({ data: pages })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      const result = await restRepository.getAvailableNotionDatabases();

      expect(result).toEqual(pages);
      expect(restApiMock.getAvailableNotionDatabases).toHaveBeenCalled();
    });
  });

  describe('setNotionDatabaseId function', () => {
    it('should call proper restApi function', async () => {
      const databaseId = 'databaseId';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        setNotionDatabaseId: jest.fn().mockImplementation((databaseId) => ({ data: databaseId })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      const result = await restRepository.setNotionDatabaseId(databaseId);

      expect(result).toEqual(databaseId);
      expect(restApiMock.setNotionDatabaseId).toHaveBeenCalledWith(databaseId);
    });
  });

  describe('getRandomNotionWords function', () => {
    it('should call proper restApi function', async () => {
      const words = [{ word: 'word', translation: 'translation, TEST     ' }];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        getRandomNotionWords: jest.fn().mockImplementation(() => ({ data: words })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      const result = await restRepository.getRandomNotionWords();

      expect(result).toEqual([
        {
          word: 'Word',
          translation: 'Translation, test',
          imageUrl: 'https://api.unsplash.com/search/photos?query=Word',
        },
      ]);
      expect(restApiMock.getRandomNotionWords).toHaveBeenCalled();
    });
  });

  describe('sendContactFormData function', () => {
    it('should call proper restApi function', async () => {
      const formData: IContact = {
        email: 'email',
        message: 'message',
        fullName: 'fullName',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        sendContactFormData: jest.fn().mockImplementation(() => ({ data: formData })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      const result = await restRepository.sendContactFormData(formData);

      expect(result).toEqual(formData);
      expect(restApiMock.sendContactFormData).toHaveBeenCalledWith(formData);
    });
  });

  describe('increaseDailyStreak function', () => {
    it('should call proper restApi function', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        increaseDailyStreak: jest.fn().mockImplementation(() => ({ data: {} })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      const result = await restRepository.increaseDailyStreak();

      expect(result).toEqual({});
      expect(restApiMock.increaseDailyStreak).toHaveBeenCalled();
    });
  });

  describe('resetNotionIntegration function', () => {
    it('should call proper restApi function', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        resetNotionIntegration: jest.fn().mockImplementation(() => ({ data: {} })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      await restRepository.resetNotionIntegration();

      expect(restApiMock.resetNotionIntegration).toHaveBeenCalled();
    });
  });

  describe('deleteProfile function', () => {
    it('should call proper restApi function', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        deleteProfile: jest.fn().mockImplementation(() => ({ data: {} })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {
        logout: jest.fn(),
      };

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      await restRepository.deleteProfile();

      expect(supabaseApiMock.logout).toHaveBeenCalled();
      expect(restApiMock.deleteProfile).toHaveBeenCalled();
    });
  });

  describe('getDictionarySuggestions function', () => {
    it('should call proper restApi function', async () => {
      const data = {
        suggestions: [
          {
            meaning: 'Meaning 1',
            example: 'Example 1',
          },
          {
            meaning: 'Meaning 2',
            example: 'Example 1',
          },
        ],
        word: 'Word',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        getDictionarySuggestions: jest.fn().mockImplementation(() => ({ data })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      const result = await restRepository.getDictionarySuggestions('word');

      expect(result).toEqual(data);
      expect(restApiMock.getDictionarySuggestions).toHaveBeenCalledWith('word');
    });
  });

  describe('updateNotionWord function', () => {
    it('should call proper restApi function', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        updateNotionWord: jest.fn().mockImplementation(() => ({ data: {} })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      await restRepository.updateNotionWord({
        id: 'id',
        meaning: 'meaning',
        exampleSentence: 'exampleSentence',
      });

      expect(restApiMock.updateNotionWord).toHaveBeenCalledWith({
        id: 'id',
        meaning: 'meaning',
        exampleSentence: 'exampleSentence',
      });
    });
  });

  describe('getNotionTableColumns function', () => {
    it('should call proper restApi function', async () => {
      const columns = ['column1', 'column2'];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        getNotionTableColumns: jest.fn().mockImplementation(() => ({ data: columns })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      const result = await restRepository.getNotionTableColumns();

      expect(result).toEqual(columns);
      expect(restApiMock.getNotionTableColumns).toHaveBeenCalled();
    });
  });

  describe('createNotionWord function', () => {
    it('should call proper restApi function', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const restApiMock: any = {
        createNotionWord: jest.fn().mockImplementation(() => ({ data: {} })),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabaseApiMock: any = {};

      const restRepository = getRestRepository(restApiMock, supabaseApiMock);

      await restRepository.createNotionWord({
        word: 'word',
        meaning: 'meaning',
        exampleSentence: 'exampleSentence',
      });

      expect(restApiMock.createNotionWord).toHaveBeenCalledWith({
        word: 'word',
        meaning: 'meaning',
        exampleSentence: 'exampleSentence',
      });
    });
  });
});
