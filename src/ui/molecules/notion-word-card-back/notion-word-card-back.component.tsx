import { FC } from 'react';

import { Card } from '@ui/atoms';

import { INotionWordCardBackProps } from './notion-word-card-back.types';

export const NotionWordCardBack: FC<INotionWordCardBackProps> = (): JSX.Element => (
  <Card w={{ base: 300, sm: 350, md: 400 }}>Back of the card</Card>
);
