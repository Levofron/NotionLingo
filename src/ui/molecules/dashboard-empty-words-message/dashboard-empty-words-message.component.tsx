import { FC } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import { Button, Flex, Text } from '@ui/atoms';

import { IDashboardEmptyWordsMessageProps } from './dashboard-empty-words-message.types';

export const DashboardEmptyWordsMessage: FC<IDashboardEmptyWordsMessageProps> = ({
  onRefetch,
}): JSX.Element => (
  <Flex
    alignItems="center"
    flexDirection="column"
    gap={{ base: 3, sm: 5 }}
    height="100%"
    justifyContent="center"
  >
    <Text
      withBalancer
      fontSize={{ base: 'md', sm: 'xl' }}
      fontWeight="medium"
      maxWidth="350px"
      textAlign="center"
    >
      No words found. Please fill up your <b>Notion</b> database with words.
    </Text>
    <Button
      leftIcon={<FiRefreshCcw />}
      size={{ base: 'sm', sm: 'md', md: 'lg' }}
      onClick={onRefetch}
    >
      Refetch
    </Button>
  </Flex>
);
