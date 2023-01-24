import { FC } from 'react';

import { Button, Flex, Text } from '@ui/atoms';

import { IDashboardEmptyWordsMessageProps } from './dashboard-empty-words-message.types';

export const DashboardEmptyWordsMessage: FC<IDashboardEmptyWordsMessageProps> = ({
  onRefetch,
}): JSX.Element => (
  <Flex alignItems="center" flexDirection="column" gap={{ base: 3, sm: 5 }} justifyContent="center">
    <Text fontWeight="medium" maxWidth="300px" textAlign="center">
      No words found. Please fill up your Notion database with words.
    </Text>
    <Button size={{ base: 'sm', sm: 'md', md: 'lg' }} onClick={onRefetch}>
      Refetch
    </Button>
  </Flex>
);
