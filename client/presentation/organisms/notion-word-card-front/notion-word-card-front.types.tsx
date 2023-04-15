import { NotionWord } from '@domain/rest/rest.models';

export interface NotionWordCardFrontProps {
  countdown: number;
  isCountdownEnded: boolean;
  isLoading: boolean;
  isTopCard: boolean;
  notionWord: NotionWord;
  onApplySuggestions: () => void;
  onClick: () => void;
}
