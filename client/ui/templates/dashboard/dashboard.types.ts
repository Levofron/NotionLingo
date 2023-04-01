import {
  IIncreaseDailyStreak,
  INotionWord,
  IUpdateNotionWordRequest,
} from '@domain/rest/rest.types';

export interface IDashboardProps {
  dailyStreakData: IIncreaseDailyStreak;
  fetchMoreWords: () => void;
  isRandomWordsLoading: boolean;
  isUpdateWordLoading: boolean;
  onApplySuggestion: (data: IUpdateNotionWordRequest) => () => void;
  onNotionWordCardClick: (notionWord: INotionWord) => () => void;
  words: INotionWord[];
}
