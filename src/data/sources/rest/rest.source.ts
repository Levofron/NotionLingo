import { IRestSource } from './rest.types';
import { restEndpoints } from './rest.defaults';

import { AxiosInstance } from 'axios';
import { TSession } from '@domain/supabase/supabase.types';

export const getRestSource = (axiosInstance: AxiosInstance): IRestSource => ({
  healthCheck: async () => {
    const response = await axiosInstance.get(restEndpoints.HEALTH_CHECK);

    return response;
  },
  setSupabaseCookie: async (supabaseSession: TSession | null) => {
    axiosInstance.post(restEndpoints.SET_SUPABASE_COOKIE, {
      session: supabaseSession,
      // TODO - verify if this is enough
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
});
