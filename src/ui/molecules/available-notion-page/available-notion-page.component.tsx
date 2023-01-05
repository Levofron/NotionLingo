import { FC, useCallback } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  ChakraNextLink,
  Divider,
  Heading,
  Stack,
  Text,
} from '@ui/atoms';

import { IAvailableNotionPageProps } from './available-notion-page.types';

export const AvailableNotionPage: FC<IAvailableNotionPageProps> = ({
  availableNotionPage,
  isLoading,
  onClick,
}): JSX.Element => {
  const handleClick = useCallback(() => onClick(availableNotionPage.id), []);

  return (
    <Card bg="gray.50">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="lg">{availableNotionPage.title}</Heading>
          <Text>
            <b>Created:</b> {availableNotionPage.createdTime.split(/[ t]/i, 1)[0]}
          </Text>
          <Text>
            <b>Last edited:</b> {availableNotionPage.lastEditedTime.split(/[ t]/i, 1)[0]}
          </Text>
          <Text>
            <b>Url:</b>{' '}
            <ChakraNextLink href={availableNotionPage.url} target="_blank">
              {availableNotionPage.url}
            </ChakraNextLink>
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          _hover={{
            bg: 'red.500',
          }}
          bg="red.400"
          h="35px"
          isLoading={isLoading}
          variant="no-hover"
          w={{ sm: '75px', lg: '100px' }}
          onClick={handleClick}
        >
          <Text color="#fff" fontSize="xs" fontWeight="bold">
            Select
          </Text>
        </Button>
      </CardFooter>
    </Card>
  );
};
