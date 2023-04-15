import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';

import { HttpStatusCode } from '@server/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  getProfileById,
  validatRoutesecretMiddleware,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  withMiddleware,
} from '@server/utils';

import { getSupabaseService } from '@config/supabase.instance';

const getUserMetadataById = (userId: string) => {
  const supabaseService = getSupabaseService();

  return supabaseService.auth.api.getUserById(userId);
};

export const getProfileAndUserMetadataById = async (userId: string) => {
  const profileData = await getProfileById(userId);
  const { data: user, error: userError } = await getUserMetadataById(userId);

  if (userError) {
    throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, userError.message);
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

  res.status(HttpStatusCode.OK).json(profileDetails);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validatRoutesecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
  validateIfParametersExistsMiddleware('query', ['id']),
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
