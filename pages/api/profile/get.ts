import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { EHttpStatusCode } from '@infrastructure/types/http-status-code';

import {
  assignRequestTokenToSupabaseSessionMiddleware,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import { getSupabaseService, supabaseInstance } from '@config/supabase/supabase.instance';

export const getProfileById = async (userId: string) => {
  const { data } = await supabaseInstance
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .throwOnError()
    .single();

  return data;
};

const getUserMetadataById = (userId: string) => {
  const supabaseService = getSupabaseService();

  return supabaseService.auth.api.getUserById(userId);
};

export const getProfileAndUserMetadataById = async (userId: string) => {
  const profileData = await getProfileById(userId);
  const { data: user, error: userError } = await getUserMetadataById(userId);

  if (userError) {
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.id as string;
  const profileDetails = await getProfileAndUserMetadataById(userId);

  res.status(EHttpStatusCode.OK).json(profileDetails);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
  validateIfParametersExistsMiddleware('query', ['id']),
];

export default withMiddleware(handler)(middlewareToApply);
