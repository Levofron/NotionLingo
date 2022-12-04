import { IRestRepository } from '@domain/rest/rest.repository';
import { IRestSource } from '../sources/rest/rest.types';
import { ISupabaseSource } from '../sources/supabase/supabase.types';

export const getRestRepository = (
  restSource: IRestSource,
  supabaseSource: ISupabaseSource,
): IRestRepository => ({
  healthCheck: () => restSource.healthCheck(),
  setSupabaseCookie: async () => {
    const session = await supabaseSource.getSession();

    return restSource.setSupabaseCookie(session);
  },
  getLoggedUser: () => restSource.getLoggedUser(),
  setNotionApiToken: (token: string) => restSource.setNotionApiToken(token),
  getAvailableNotionPages: () => restSource.getAvailableNotionPages(),
  setNotionPageId: (pageId: string) => restSource.setNotionPageId(pageId),
  getRandomNotionWords: () => restSource.getRandomNotionWords(),
});
