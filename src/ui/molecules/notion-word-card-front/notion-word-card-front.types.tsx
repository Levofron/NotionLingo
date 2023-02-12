import { INotionWord } from '@domain/entities/rest.types';

export interface INotionWordCardFrontProps {
  countdown: number;
  isCountdownEnded: boolean;
  isTopCard: boolean;
  notionWord: INotionWord;
  onClick: () => void;
}
