import { INotionWord } from '@domain/rest/rest.models';

export interface INotionWordCardFrontProps extends INotionWord {
  countdown: number;
  isCountdownEnded: boolean;
  isTopCard: boolean;
  onClick: () => void;
}
