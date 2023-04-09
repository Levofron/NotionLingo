import { INotionWord } from '@domain/rest/rest.types';

export interface INotionWordCardFrontProps {
  countdown: number;
  isCountdownEnded: boolean;
  isLoading: boolean;
  isTopCard: boolean;
  notionWord: INotionWord;
  onApplySuggestions: () => void;
  onClick: () => void;
}
