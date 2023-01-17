import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure/config';
import { isString } from '@infrastructure/utils';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  getUserFromRequest,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

const isIsoDate = (string: string) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(string)) {
    return false;
  }

  const date = new Date(string);

  return date instanceof Date && !Number.isNaN(date) && date.toISOString() === string;
};

const getProfileDetails = (userId: string) =>
  supabaseInstance
    .from('profiles')
    .select('days_in_streak,today_words_streak,last_daily_streak_updated_at,total_learned_words')
    .eq('id', userId)
    .single();

const updateProfileDetailsDecorator = (userId: string, currentDate: Date) => (data: object) =>
  supabaseInstance
    .from('profiles')
    .update({
      ...data,
      last_daily_streak_updated_at: currentDate,
    })
    .eq('id', userId);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  const { data: profileData, error: profileError } = await getProfileDetails(user?.id!);

  if (profileError) {
    return res.status(500).json(profileError);
  }

  const { currentDate } = req.query;

  if (!isString(currentDate)) {
    return res.status(400).json({ message: 'Invalid date' });
  }

  if (!isIsoDate(currentDate)) {
    return res.status(400).json({ message: 'Invalid date' });
  }

  const currentDateAsDate = new Date(currentDate);
  const updateProfileDetails = updateProfileDetailsDecorator(user?.id!, currentDateAsDate);

  if (!isIsoDate(profileData.last_daily_streak_updated_at)) {
    await updateProfileDetails({
      days_in_streak: 1,
      today_words_streak: 1,
      total_learned_words: 1,
    });

    return res.status(200).json(profileData);
  }

  const lastDailyStreakUpdatedAtAsDate = new Date(profileData.last_daily_streak_updated_at);

  if (currentDateAsDate.toDateString() === lastDailyStreakUpdatedAtAsDate.toDateString()) {
    await updateProfileDetails({
      days_in_streak: 1,
      today_words_streak: profileData.today_words_streak + 1,
      total_learned_words: profileData.total_learned_words + 1,
    });

    return res.status(200).json(profileData);
  }

  if (currentDateAsDate.getTime() - lastDailyStreakUpdatedAtAsDate.getTime() <= 86_400_000) {
    await updateProfileDetails({
      today_words_streak: 1,
      days_in_streak: profileData.days_in_streak + 1,
      total_learned_words: profileData.total_learned_words + 1,
    });

    return res.status(200).json(profileData);
  }

  await updateProfileDetails({
    days_in_streak: 1,
    today_words_streak: 1,
    total_learned_words: profileData.total_learned_words + 1,
  });

  res.status(200).json(profileData);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
  validateIfParametersExistsMiddleware('query', ['currentDate']),
];

export default withMiddleware(handler)(middlewareToApply);
