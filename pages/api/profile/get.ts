import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';

import { EHttpStatusCode } from '@server/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  getProfileById,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
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
    throw new ApiError(EHttpStatusCode.INTERNAL_SERVER_ERROR, userError.message);
  }

  const hasNotionData = !!profileData?.notion_api_key && !!profileData?.notion_database_id;

  return {
    hasNotionData,
    id: profileData.id,
    email: profileData.email,
    createdAt: profileData.created_at,
    fullName: user?.user_metadata.full_name,
    daysInStreak: profileData?.days_in_streak,
    todayWordsStreak: profileData?.today_words_streak,
    totalLearnedWords: profileData?.total_learned_words,
    avatarUrl:
      user?.user_metadata.avatar_url ||
      'https://images.unsplash.com/photo-1606951069946-cceca96395f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
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

export default withAxiom(withMiddleware(handler)(middlewareToApply));
