import { INotionWord } from '@domain/rest/rest.models';

export interface INotionWordCardFrontProps {
  countdown: number;
  isCountdownEnded: boolean;
  isLoading: boolean;
  isTopCard: boolean;
  notionWord: INotionWord;
  onApplySuggestions: () => void;
  onClick: () => void;
}
