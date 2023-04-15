import { Session } from '@supabase/supabase-js';
import { AxiosInstance } from 'axios';

import { Contact } from '@domain/rest/rest.models';

import { RestApi, RestEndpoints } from './rest.types';

export const getRestApi = (axiosInstance: AxiosInstance): RestApi => ({
  healthCheck: () => axiosInstance.get(RestEndpoints.HEALTH_CHECK),
  setSupabaseCookie: async (supabaseSession: Session | null) => {
    axiosInstance.post(RestEndpoints.SET_SUPABASE_COOKIE, {
      session: supabaseSession,
      event: supabaseSession ? 'SIGNED_IN' : 'SIGNED_OUT',
    });
  },
  getLoggedProfile: () => axiosInstance.get(RestEndpoints.GET_LOGGED_PROFILE),
  setNotionApiToken: async (token: string) => {
    const trimmedToken = token.trim();
    const response = await axiosInstance.post(RestEndpoints.SET_NOTION_API_TOKEN, {
      token: trimmedToken,
    });

    return response;
  },
  getAvailableNotionDatabases: () =>
    axiosInstance.get(RestEndpoints.GET_AVAILABLE_NOTION_DATABASES),
  setNotionDatabaseId: (databaseId: string) =>
    axiosInstance.post(RestEndpoints.SET_NOTION_DATABASE_ID, { databaseId }),
  getRandomNotionWords: () => axiosInstance.get(RestEndpoints.GET_RANDOM_NOTION_WORDS),
  sendContactFormData: (data: Contact) => axiosInstance.post(RestEndpoints.CONTACT, data),
  increaseDailyStreak: async () => {
    const encodedCurrentDate = encodeURIComponent(new Date().toISOString());

    const response = await axiosInstance.get(
      `${RestEndpoints.INCREASE_DAILY_STREAK}?currentDate=${encodedCurrentDate}`,
    );

    return response;
  },
  resetNotionIntegration: () => axiosInstance.get(RestEndpoints.RESET_NOTION_INTEGRATION),
  deleteProfile: () => axiosInstance.delete(RestEndpoints.DELETE_PROFILE),
  getDictionarySuggestions: async (word: string) => {
    const encodedCurrentDate = encodeURIComponent(word);

    const response = await axiosInstance.get(
      `${RestEndpoints.GET_DICTIONARY_SUGGESTIONS}?word=${encodedCurrentDate}`,
    );

    return response;
  },
  updateNotionWord: (data) => axiosInstance.post(RestEndpoints.UPDATE_NOTION_WORD, data),
  getNotionTableColumns: () => axiosInstance.get(RestEndpoints.GET_NOTION_TABLE_COLUMNS),
  createNotionWord: (data) => axiosInstance.post(RestEndpoints.CREATE_NOTION_WORD, data),
});
