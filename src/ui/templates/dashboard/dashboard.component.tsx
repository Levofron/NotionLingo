import { Container } from '@chakra-ui/react';
import { FC } from 'react';

import { Box } from '@ui/atoms';
import { NotionWordCard } from '@ui/molecules';

import { IDashboardProps } from './dashboard.types';

export const DashboardTemplate: FC<IDashboardProps> = (): JSX.Element => (
  <Box bg="gray.50" height="100%">
    <Container height="100%" maxW="6xl" pt={{ base: 66, md: 74 }}>
      <NotionWordCard
        exampleSentence="I killed two birds with one stone and picked the kids up on the way to the supermarket."
        meaning="to succeed in achieving two things in a single action"
        word="Kill two birds with one stone"
      />
    </Container>
  </Box>
);
