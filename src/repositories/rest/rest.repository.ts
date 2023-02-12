import { IRestApi } from '@api/rest/rest.types';
import { ISupabaseApi } from '@api/supabase/supabase.types';

import { IRestRepository } from '@domain/repositories/rest.repository';

import {
  addImageUrlForEachNotionWordTransformator,
  formatRandomNotionWordsTransformator,
  formatWordSuggestions,
} from './utils';

export const getRestRepository = (
  restApi: IRestApi,
  supabaseApi: ISupabaseApi,
): IRestRepository => ({
  healthCheck: async () => {
    const { data } = await restApi.healthCheck();

    return data;
  },
  setSupabaseCookie: async () => {
    const session = await supabaseApi.getSession();

    await restApi.setSupabaseCookie(session);
  },
  getLoggedProfile: async () => {
    const { data } = await restApi.getLoggedProfile();

    return data;
  },
  setNotionApiToken: async (token: string) => {
    const { data } = await restApi.setNotionApiToken(token);

    return data;
  },
  getAvailableNotionDatabases: async () => {
    const { data } = await restApi.getAvailableNotionDatabases();

    return data;
  },
  setNotionDatabaseId: async (databaseId: string) => {
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
  resetNotionIntegration: async () => {
    await restApi.resetNotionIntegration();
  },
  deleteProfile: async () => {
    await restApi.deleteProfile();

    supabaseApi.logout();
  },
  getWordSuggestions: async (word: string) => {
    const { data } = await restApi.getWordSuggestions(word);

    return formatWordSuggestions(data);
  },
});
