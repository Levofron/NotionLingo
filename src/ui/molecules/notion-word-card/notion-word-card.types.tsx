import { INotionWord } from '@domain/rest/rest.models';

export interface INotionWordCardProps extends INotionWord {
  countdown: number;
  isCountdownEnded: boolean;
  onClick: () => void;
}
