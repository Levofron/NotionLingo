import { AxiosInstance } from 'axios';

import { TSession } from '@domain/supabase/supabase.types';

import { restEndpoints } from './rest.defaults';
import { IRestSource } from './rest.types';

export const getRestSource = (axiosInstance: AxiosInstance): IRestSource => ({
  healthCheck: async () => {
    const response = await axiosInstance.get(restEndpoints.HEALTH_CHECK);

    return response;
  },
  setSupabaseCookie: async (supabaseSession: TSession | null) => {
    axiosInstance.post(restEndpoints.SET_SUPABASE_COOKIE, {
      session: supabaseSession,
      event: supabaseSession ? 'SIGNED_IN' : 'SIGNED_OUT',
    });
  },
  getLoggedUser: async () => {
    const response = await axiosInstance.get(restEndpoints.GET_LOGGED_USER);

    return response;
  },
  setNotionApiToken: async (token: string) => {
    const response = await axiosInstance.post(restEndpoints.SET_NOTION_API_TOKEN, { token });

    return response;
  },
  getAvailableNotionPages: async () => {
    const response = await axiosInstance.get(restEndpoints.GET_AVAILABLE_NOTION_PAGES);

    return response;
  },
  setNotionPageId: async (pageId: string) => {
    const response = await axiosInstance.post(restEndpoints.SET_NOTION_PAGE_ID, { pageId });

    return response;
  },
  getRandomNotionWords: async () => {
    const response = await axiosInstance.get(restEndpoints.GET_RANDOM_NOTION_WORDS);

    return response;
  },
});
