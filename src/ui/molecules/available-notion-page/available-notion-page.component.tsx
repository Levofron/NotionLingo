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
    <Card>
      <CardBody>
        <Stack spacing="3">
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
        <Button isLoading={isLoading} onClick={handleClick}>
          <Text fontSize="xs" fontWeight="bold">
            Select
          </Text>
        </Button>
      </CardFooter>
    </Card>
  );
};
