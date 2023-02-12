import { IContact } from '@domain/rest/rest.models';
import { IRestRepository } from '@domain/rest/rest.repository';

import { IRestSource } from '../../sources/rest/rest.types';
import { ISupabaseSource } from '../../sources/supabase/supabase.types';
import {
  addImageUrlForEachNotionWordTransformator,
  formatRandomNotionWordsTransformator,
} from '../../transformators/rest';

export const getRestRepository = (
  restSource: IRestSource,
  supabaseSource: ISupabaseSource,
): IRestRepository => ({
  healthCheck: async () => {
    const { data } = await restSource.healthCheck();

    return data;
  },
  setSupabaseCookie: async () => {
    const session = await supabaseSource.getSession();

    await restSource.setSupabaseCookie(session);
  },
  getLoggedUser: async () => {
    const { data } = await restSource.getLoggedUser();

    return data;
  },
  setNotionApiToken: async (token: string) => {
    const { data } = await restSource.setNotionApiToken(token);

    return data;
  },
  getAvailableNotionDatabases: async () => {
    const { data } = await restSource.getAvailableNotionDatabases();

    return data;
  },
  setNotionDatabaseId: async (databaseId: string) => {
    const { data } = await restSource.setNotionDatabaseId(databaseId);

    return data;
  },
  getRandomNotionWords: async () => {
    const { data } = await restSource.getRandomNotionWords();

    const transformedData = formatRandomNotionWordsTransformator(data);

    return addImageUrlForEachNotionWordTransformator(transformedData);
  },
  sendContactFormData: async (data: IContact) => {
    const { data: response } = await restSource.sendContactFormData(data);

    return response;
  },
  increaseDailyStreak: async () => {
    const { data } = await restSource.increaseDailyStreak();

    return data;
  },
  resetNotionIntegration: async () => {
    await restSource.resetNotionIntegration();
  },
  deleteProfile: async () => {
    await restSource.deleteProfile();

    supabaseSource.logout();
  },
  getWordSuggestions: async (word: string) => {
    const { data } = await restSource.getWordSuggestions(word);

    return data;
  },
});
