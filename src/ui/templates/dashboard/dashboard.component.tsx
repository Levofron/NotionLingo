import { Center } from '@chakra-ui/react';
import { FC } from 'react';

import { NotionWordCard } from '@ui/molecules';

import { IDashboardProps } from './dashboard.types';

export const DashboardTemplate: FC<IDashboardProps> = (): JSX.Element => (
  <div className="block">
    <Center>
      <NotionWordCard
        exampleSentence="I killed two birds with one stone and picked the kids up on the way to the supermarket."
        meaning="to succeed in achieving two things in a single action"
        word="Kill two birds with one stone"
      />
    </Center>
  </div>
);
