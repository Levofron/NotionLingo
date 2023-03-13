import { Session } from '@supabase/supabase-js';
import { AxiosInstance } from 'axios';

import { IContact } from '@domain/entities/rest.types';

import { ERestEndpoints, IRestApi } from './rest.types';

export const getRestApi = (axiosInstance: AxiosInstance): IRestApi => ({
  healthCheck: () => axiosInstance.get(ERestEndpoints.HEALTH_CHECK),
  setSupabaseCookie: async (supabaseSession: Session | null) => {
    axiosInstance.post(ERestEndpoints.SET_SUPABASE_COOKIE, {
      session: supabaseSession,
      event: supabaseSession ? 'SIGNED_IN' : 'SIGNED_OUT',
    });
  },
  getLoggedProfile: () => axiosInstance.get(ERestEndpoints.GET_LOGGED_PROFILE),
  setNotionApiToken: async (token: string) => {
    const trimmedToken = token.trim();
    const response = await axiosInstance.post(ERestEndpoints.SET_NOTION_API_TOKEN, {
      token: trimmedToken,
    });

    return response;
  },
  getAvailableNotionDatabases: () =>
    axiosInstance.get(ERestEndpoints.GET_AVAILABLE_NOTION_DATABASES),
  setNotionDatabaseId: (databaseId: string) =>
    axiosInstance.post(ERestEndpoints.SET_NOTION_DATABASE_ID, { databaseId }),
  getRandomNotionWords: () => axiosInstance.get(ERestEndpoints.GET_RANDOM_NOTION_WORDS),
  sendContactFormData: (data: IContact) => axiosInstance.post(ERestEndpoints.CONTACT, data),
  increaseDailyStreak: async () => {
    const encodedCurrentDate = encodeURIComponent(new Date().toISOString());

    const response = await axiosInstance.get(
      `${ERestEndpoints.INCREASE_DAILY_STREAK}?currentDate=${encodedCurrentDate}`,
    );

    return response;
  },
  resetNotionIntegration: () => axiosInstance.get(ERestEndpoints.RESET_NOTION_INTEGRATION),
  deleteProfile: () => axiosInstance.delete(ERestEndpoints.DELETE_PROFILE),
  getDictionarySuggestions: async (word: string) => {
    const encodedCurrentDate = encodeURIComponent(word);

    const response = await axiosInstance.get(
      `${ERestEndpoints.GET_DICTIONARY_SUGGESTIONS}?word=${encodedCurrentDate}`,
    );

    return response;
  },
  updateNotionWord: (data) => axiosInstance.post(ERestEndpoints.UPDATE_NOTION_WORD, data),
  getNotionTableColumns: () => axiosInstance.get(ERestEndpoints.GET_NOTION_TABLE_COLUMNS),
  createNotionWord: (data) => axiosInstance.post(ERestEndpoints.CREATE_NOTION_WORD, data),
});
