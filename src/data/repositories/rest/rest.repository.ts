import { IRestRepository } from '@domain/rest/rest.repository';

import { IRestSource } from '../../sources/rest/rest.types';
import { ISupabaseSource } from '../../sources/supabase/supabase.types';
import { formatRandomNotionWordsTransformator } from '../../transformators/rest';

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
  getAvailableNotionPages: async () => {
    const { data } = await restSource.getAvailableNotionPages();

    return data;
  },
  setNotionPageId: async (pageId: string) => {
    const { data } = await restSource.setNotionPageId(pageId);

    return data;
  },
  getRandomNotionWords: async () => {
    const { data } = await restSource.getRandomNotionWords();

    return formatRandomNotionWordsTransformator(data);
  },
});
