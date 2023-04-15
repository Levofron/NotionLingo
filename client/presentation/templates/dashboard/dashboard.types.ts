import { IncreaseDailyStreak, NotionWord, UpdatedNotionWord } from '@domain/rest/rest.models';

export interface DashboardProps {
  dailyStreakData: IncreaseDailyStreak;
  fetchMoreWords: () => void;
  isRandomWordsLoading: boolean;
  isUpdateWordLoading: boolean;
  onApplySuggestion: (data: UpdatedNotionWord) => () => void;
  onNotionWordCardClick: (notionWord: NotionWord) => () => void;
  words: NotionWord[];
}
