import { FC } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import { Button, Card, Flex, Heading, Icon, Stack, Text } from '@presentation/atoms';

import { IDisplayErrorProps } from './display-error.types';

export const DisplayError: FC<IDisplayErrorProps> = ({
  errorMessage,
  icon,
  isLoading,
  onRedirectToHomeButtonClick,
  onRefetchButtonClick,
  title,
}): JSX.Element => (
  <Card align="center" as={Flex} gap={6} maxW="lg" p={8} textAlign="center">
    <Icon as={icon} color="gray.900" fontSize="100" />
    <Stack spacing={2}>
      <Heading>{title}</Heading>
      {errorMessage ? <Text withBalancer>{errorMessage}</Text> : null}
    </Stack>
    <Flex flexDirection="column" gap={{ base: 3, sm: 5 }}>
      {onRefetchButtonClick ? (
        <Button isLoading={isLoading} leftIcon={<FiRefreshCcw />} onClick={onRefetchButtonClick}>
          Refetch
        </Button>
      ) : null}
      <Button isLoading={isLoading} onClick={onRedirectToHomeButtonClick}>
        Back to home
      </Button>
    </Flex>
  </Card>
);

export default DisplayError;
