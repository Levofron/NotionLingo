import { Container } from '@chakra-ui/react';
import { FC } from 'react';

import { Box } from '@ui/atoms';

import { IDashboardProps } from './dashboard.types';

export const DashboardTemplate: FC<IDashboardProps> = (): JSX.Element => (
  <Box bg="gray.50" height="100%">
    <Container height="100%" maxW="6xl" pt={{ base: 66, md: 74 }}>
      Dashboard
    </Container>
  </Box>
);
