import { IRestApi } from '@api/rest/rest.types';

import { IRestRepository } from '@domain/rest/rest.repository';

import {
  addImageUrlForEachNotionWordTransformator,
  formatDictionarySuggestions,
  formatRandomNotionWordsTransformator,
  updateRecordInNotionWordArray,
} from './helpers';

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

export const getRestRepository = (restApi: IRestApi): IRestRepository => ({
  healthCheck: async () => {
    const { data } = await restApi.healthCheck();

    return data;
  },
  setSupabaseCookie: async (session) => {
    await restApi.setSupabaseCookie(session);
    await delay(1000);
  },
  getLoggedProfile: async () => {
    const { data } = await restApi.getLoggedProfile();

    return data;
  },
  setNotionApiToken: async (token) => {
    const { data } = await restApi.setNotionApiToken(token);

    return data;
  },
  getAvailableNotionDatabases: async () => {
    const { data } = await restApi.getAvailableNotionDatabases();

    return data;
  },
  setNotionDatabaseId: async (databaseId) => {
    const { data } = await restApi.setNotionDatabaseId(databaseId);

    return data;
  },
  getRandomNotionWords: async () => {
    const { data } = await restApi.getRandomNotionWords();

    const transformedData = formatRandomNotionWordsTransformator(data);

    return addImageUrlForEachNotionWordTransformator(transformedData);
  },
  sendContactFormData: async (data) => {
    const { data: response } = await restApi.sendContactFormData(data);

    return response;
  },
  increaseDailyStreak: async () => {
    const { data } = await restApi.increaseDailyStreak();

    return data;
  },
  resetNotionIntegration: () => restApi.resetNotionIntegration(),
  deleteProfile: () => restApi.deleteProfile(),
  getDictionarySuggestions: async (word) => {
    const { data } = await restApi.getDictionarySuggestions(word);

    if (!data?.suggestions?.length) {
      return null;
    }

    return formatDictionarySuggestions(data);
  },
  updateNotionWord: async ({ updatedNotionWord, words }) => {
    const { data: response } = await restApi.updateNotionWord(updatedNotionWord);
    const updatedNotionWords = updateRecordInNotionWordArray(words, response.id, updatedNotionWord);

    return updatedNotionWords || words;
  },
  getNotionTableColumns: async () => {
    const { data } = await restApi.getNotionTableColumns();

    return data;
  },
  createNotionWord: async (data) => {
    const { data: response } = await restApi.createNotionWord(data);

    return response.id;
  },
});
