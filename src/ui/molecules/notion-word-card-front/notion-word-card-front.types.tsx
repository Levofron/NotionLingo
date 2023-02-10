import { INotionWord } from '@domain/rest/rest.models';

export interface INotionWordCardFrontProps {
  countdown: number;
  isCountdownEnded: boolean;
  isTopCard: boolean;
  notionWord: INotionWord;
  onClick: () => void;
}
