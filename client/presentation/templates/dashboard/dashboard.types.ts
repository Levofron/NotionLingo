import { IIncreaseDailyStreak, INotionWord, IUpdatedNotionWord } from '@domain/rest/rest.models';

export interface IDashboardProps {
  dailyStreakData: IIncreaseDailyStreak;
  fetchMoreWords: () => void;
  isRandomWordsLoading: boolean;
  isUpdateWordLoading: boolean;
  onApplySuggestion: (data: IUpdatedNotionWord) => () => void;
  onNotionWordCardClick: (notionWord: INotionWord) => () => void;
  words: INotionWord[];
}
