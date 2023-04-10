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
} from '@presentation/atoms';

import { IAvailableNotionDatabaseProps } from './available-notion-database.types';

export const AvailableNotionDatabase: FC<IAvailableNotionDatabaseProps> = ({
  availableNotionDatabase,
  isLoading,
  onClick,
}): JSX.Element => {
  const handleClick = useCallback(() => onClick(availableNotionDatabase.id), []);

  return (
    <Card>
      <CardBody>
        <Stack spacing="3">
          <Heading size="lg">{availableNotionDatabase.title}</Heading>
          <Text>
            <b>Created:</b> {availableNotionDatabase.createdTime.split(/[ t]/i, 1)[0]}
          </Text>
          <Text>
            <b>Last edited:</b> {availableNotionDatabase.lastEditedTime.split(/[ t]/i, 1)[0]}
          </Text>
          <Text>
            <b>Url:</b>{' '}
            <ChakraNextLink href={availableNotionDatabase.url} target="_blank">
              {availableNotionDatabase.url}
            </ChakraNextLink>
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button isLoading={isLoading} onClick={handleClick}>
          Select
        </Button>
      </CardFooter>
    </Card>
  );
};
