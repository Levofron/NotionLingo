import { AxiosInstance } from 'axios';

import { IContact } from '@domain/rest/rest.models';
import { TSession } from '@domain/supabase/supabase.types';

import { ERestEndpoints } from './rest.defaults';
import { IRestSource } from './rest.types';

export const getRestSource = (axiosInstance: AxiosInstance): IRestSource => ({
  healthCheck: () => axiosInstance.get(ERestEndpoints.HEALTH_CHECK),
  setSupabaseCookie: async (supabaseSession: TSession | null) => {
    axiosInstance.post(ERestEndpoints.SET_SUPABASE_COOKIE, {
      session: supabaseSession,
      event: supabaseSession ? 'SIGNED_IN' : 'SIGNED_OUT',
    });
  },
  getLoggedUser: () => axiosInstance.get(ERestEndpoints.GET_LOGGED_USER),
  setNotionApiToken: async (token: string) => {
    const trimmedToken = token.trim();
    const response = await axiosInstance.post(ERestEndpoints.SET_NOTION_API_TOKEN, {
      token: trimmedToken,
    });

    return response;
  },
  getAvailableNotionPages: () => axiosInstance.get(ERestEndpoints.GET_AVAILABLE_NOTION_PAGES),
  setNotionPageId: (pageId: string) =>
    axiosInstance.post(ERestEndpoints.SET_NOTION_PAGE_ID, { pageId }),
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
  getWordSuggestions: async (word: string) => {
    const encodedCurrentDate = encodeURIComponent(word);

    const response = await axiosInstance.get(
      `${ERestEndpoints.GET_WORD_SUGGESTIONS}?word=${encodedCurrentDate}`,
    );

    return response;
  },
});
