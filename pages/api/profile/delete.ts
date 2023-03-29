import memoryCache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';

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

import { getSupabaseService, supabaseInstance } from '@config/supabase.instance';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);
  const profileData = await getProfileDataWithNotionDataCheck(user?.id!);

  const supabaseService = getSupabaseService();

  const { error } = await supabaseService.auth.api.deleteUser(user?.id!);

  if (error) {
    throw new ApiError(EHttpStatusCode.INTERNAL_SERVER_ERROR, error.message);
  }

  await supabaseInstance
    .from('profiles')
    .update({
      is_deleted: true,
    })
    .eq('id', user?.id);

  const notionApiKey = getNotionApiKeyFromProfile(profileData);
  const cacheKey = generateMemoryCacheKey(user!.id, profileData.notion_database_id, notionApiKey);

  memoryCache.del(cacheKey);

  res.status(EHttpStatusCode.OK).json({ userId: user?.id });
};

const middlewareToApply = [
  validateRequestMethodMiddleware('DELETE'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
