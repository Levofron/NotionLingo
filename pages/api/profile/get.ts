import { NextApiResponse } from 'next';
import { AxiomAPIRequest, withAxiom } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';

import { EHttpStatusCode } from '@server/types/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  getProfileById,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import { getSupabaseService } from '@config/supabase/supabase.instance';

const getUserMetadataById = (userId: string) => {
  const supabaseService = getSupabaseService();

  return supabaseService.auth.api.getUserById(userId);
};

export const getProfileAndUserMetadataById = async (userId: string, req: AxiomAPIRequest) => {
  const profileData = await getProfileById(userId);

  req.log.info(JSON.stringify(profileData));
  const { data: user, error: userError } = await getUserMetadataById(userId);

  req.log.info(JSON.stringify(user));

  if (userError) {
    req.log.error(JSON.stringify(userError));
    throw new ApiError(EHttpStatusCode.INTERNAL_SERVER_ERROR, userError.message);
  }

  const hasNotionData = !!profileData?.notion_api_key && !!profileData?.notion_database_id;

  return {
    hasNotionData,
    id: profileData.id,
    email: profileData.email,
    createdAt: profileData.created_at,
    fullName: user?.user_metadata.full_name,
    avatarUrl: user?.user_metadata.avatar_url,
    daysInStreak: profileData?.days_in_streak,
    todayWordsStreak: profileData?.today_words_streak,
    totalLearnedWords: profileData?.total_learned_words,
  };
};

const handler = async (req: AxiomAPIRequest, res: NextApiResponse) => {
  const userId = req.query.id as string;
  const profileDetails = await getProfileAndUserMetadataById(userId, req);

  res.status(EHttpStatusCode.OK).json(profileDetails);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
  validateIfParametersExistsMiddleware('query', ['id']),
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
