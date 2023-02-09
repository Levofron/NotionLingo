import { NextApiRequest, NextApiResponse } from 'next';

import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  getUserFromRequest,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

import { getProfileById } from './get';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);
  const profileData = await getProfileById(user?.id!);

  const hasNotionData = !!profileData?.notion_api_key && !!profileData?.notion_page_id;

  const userData = {
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

  res.status(EHttpStatusCode.OK).json(userData);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
