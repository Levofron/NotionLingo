import { useCallback, useEffect, useState } from 'react';

import { withCheckIfUserLogged } from '@presentation/hoc';
import { Dashboard as DashboardTemplate } from '@presentation/templates';

import { useIncreaseStreak, useRandomWords, useUpdateWord } from '@adapter/hooks';

import { removeNotionWordFromArray } from '@domain/rest/operations';
import { IncreaseDailyStreak, NotionWord, UpdatedNotionWord } from '@domain/rest/rest.models';

import { useToast, useUser } from '@shared/hooks';
import { Routes } from '@shared/routes';

const DashboardComponent = () => {
  const toast = useToast();
  const { user } = useUser();
  const [words, setWords] = useState<NotionWord[]>([]);

  const [dailyStreakData, setDailyStreakData] = useState<IncreaseDailyStreak>({
    daysInStreak: user?.daysInStreak || 0,
    todayWordsStreak: user?.todayWordsStreak || 0,
    totalLearnedWords: user?.totalLearnedWords || 0,
  });

  const { increaseStreak } = useIncreaseStreak();
  const { isUpdateWordLoading, updateWord } = useUpdateWord();
  const { getRandomWords, isRandomWordsLoading } = useRandomWords();

  const fetchMoreWords = useCallback(() => {
    getRandomWords()
      .then((_response) => setWords((_prevState) => [..._response, ..._prevState]))
      .catch((_error) =>
        toast.error({
          description: _error,
        }),
      );
  }, [setWords]);

  useEffect(() => {
    fetchMoreWords();
  }, []);

  const handleNotionWordCardClick = (notionWord: NotionWord) => () => {
    const newWords = removeNotionWordFromArray(words, notionWord);

    setWords(newWords);
    increaseStreak().then(setDailyStreakData);

    if (newWords.length <= 3) {
      fetchMoreWords();
    }
  };

  const handleApplySuggestion = (updatedNotionWord: UpdatedNotionWord) => () =>
    updateWord({ updatedNotionWord, words })
      .then((updatedWords) => {
        setWords(updatedWords);

        toast.success({
          duration: 3000,
          description: 'Suggestions applied!',
        });
      })
      .catch((_error) =>
        toast.error({
          duration: 3000,
          description: _error,
        }),
      );

  return (
    <DashboardTemplate
      dailyStreakData={dailyStreakData}
      fetchMoreWords={fetchMoreWords}
      isRandomWordsLoading={isRandomWordsLoading}
      isUpdateWordLoading={isUpdateWordLoading}
      words={words}
      onApplySuggestion={handleApplySuggestion}
      onNotionWordCardClick={handleNotionWordCardClick}
    />
  );
};

export const Dashboard = withCheckIfUserLogged(DashboardComponent, {
  currentPageUrl: Routes.DASHBOARD,
  redirectUrlOnError: Routes.ONBOARDING,
  shouldHaveNotionData: true,
});
