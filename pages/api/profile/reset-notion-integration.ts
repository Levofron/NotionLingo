import memoryCache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';

import { EHttpStatusCode } from '@server/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  generateMemoryCacheKey,
  getNotionApiKeyFromProfile,
  getProfileDataWithNotionDataCheck,
  getUserFromRequest,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import { supabaseInstance } from '@config/supabase.instance';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);
  const profileData = await getProfileDataWithNotionDataCheck(user?.id!);

  await supabaseInstance
    .from('profiles')
    .update({
      notion_api_key: null,
      notion_database_id: null,
    })
    .eq('id', user?.id)
    .throwOnError()
    .single();

  const notionApiKey = getNotionApiKeyFromProfile(profileData);
  const cacheKey = generateMemoryCacheKey(user!.id, profileData.notion_database_id, notionApiKey);

  memoryCache.del(cacheKey);

  return res.status(EHttpStatusCode.OK).send('ok');
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
