import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';

import { isString } from '@shared/guards';

import { HttpStatusCode } from '@server/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  getProfileById,
  getUserFromRequest,
  isIsoDate,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import { supabaseInstance } from '@config/supabase.instance';

const updateProfileDetailsDecorator =
  (userId: string, currentDate: Date, res: NextApiResponse) => async (data: object) => {
    const { data: updatedProfileData } = await supabaseInstance
      .from('profiles')
      .update({
        ...data,
        last_daily_streak_updated_at: currentDate,
      })
      .eq('id', userId)
      .throwOnError()
      .single();

    return res.status(HttpStatusCode.OK).json({
      daysInStreak: updatedProfileData?.days_in_streak,
      todayWordsStreak: updatedProfileData?.today_words_streak,
      totalLearnedWords: updatedProfileData?.total_learned_words,
      lastDailyStreakUpdatedAt: updatedProfileData?.last_daily_streak_updated_at,
    });
  };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { currentDate } = req.query;

  const user = await getUserFromRequest(req);
  const profileData = await getProfileById(user?.id!);

  if (!isString(currentDate) || !isIsoDate(currentDate)) {
    throw new ApiError(HttpStatusCode.BAD_REQUEST, 'Invalid date');
  }

  const currentDateAsDate = new Date(currentDate);
  const updateProfileDetails = updateProfileDetailsDecorator(user?.id!, currentDateAsDate, res);

  if (!isIsoDate(profileData.last_daily_streak_updated_at)) {
    return updateProfileDetails({
      days_in_streak: 1,
      today_words_streak: 1,
      total_learned_words: 1,
    });
  }

  const lastDailyStreakUpdatedAtAsDate = new Date(profileData.last_daily_streak_updated_at);

  if (currentDateAsDate.toDateString() === lastDailyStreakUpdatedAtAsDate.toDateString()) {
    return updateProfileDetails({
      today_words_streak: profileData.today_words_streak + 1,
      total_learned_words: profileData.total_learned_words + 1,
    });
  }

  if (currentDateAsDate.getTime() - lastDailyStreakUpdatedAtAsDate.getTime() <= 86_400_000) {
    return updateProfileDetails({
      today_words_streak: 1,
      days_in_streak: profileData.days_in_streak + 1,
      total_learned_words: profileData.total_learned_words + 1,
    });
  }

  return updateProfileDetails({
    days_in_streak: 1,
    today_words_streak: 1,
    total_learned_words: profileData.total_learned_words + 1,
  });
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
  validateIfParametersExistsMiddleware('query', ['currentDate']),
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
