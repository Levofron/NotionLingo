import { FormEvent, useEffect } from 'react';
import { BiErrorAlt } from 'react-icons/bi';

import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  ParticlesBackground,
  Stack,
  Text,
  VStack,
} from '@ui/atoms';
import { FullScreenLoader, InputControl, SelectControl } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { useAxiosAction } from '@infrastructure/utils';

export const AddWordTemplate = (): JSX.Element => {
  const {
    data: getNotionTableColumsData,
    error: getNotionTableColumsError,
    loading: isGetNotionTableColumsLoading,
    mutate: mutateGetNotionTableColumns,
    reset: resetGetNotionTableColumns,
  } = useAxiosAction(restModule.getNotionTableColumns);

  const { mutateAsync: mutateAsyncCreateNotionWord } = useAxiosAction(restModule.createNotionWord);

  useEffect(() => {
    mutateGetNotionTableColumns();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: FormEvent<any>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    mutateAsyncCreateNotionWord(data);
  };

  const renderContent = () => {
    if (isGetNotionTableColumsLoading) {
      return (
        <FullScreenLoader
          backgroundColor="transparent"
          flexDirection="column"
          gap={{ base: 3, sm: 5 }}
          position="relative"
          zIndex={1}
        >
          <Text fontWeight="medium">Loading table columns...</Text>
        </FullScreenLoader>
      );
    }

    if (getNotionTableColumsError || !getNotionTableColumsData) {
      return (
        <Card align="center" as={Flex} bg="gray.50" gap={6} maxW="lg" p={8} textAlign="center">
          <Icon as={BiErrorAlt} color="gray.900" fontSize="100" />
          <Stack spacing={2}>
            <Heading>Error occured :(</Heading>
            <Text withBalancer>{getNotionTableColumsError}</Text>
          </Stack>
          <Flex>
            <Button
              onClick={() => {
                resetGetNotionTableColumns();
                mutateGetNotionTableColumns();
              }}
            >
              Refetch
            </Button>
          </Flex>
        </Card>
      );
    }

    return (
      <Card minW={{ base: 'unset', md: '350px' }} p={{ base: 4, sm: 6, md: 8 }}>
        <VStack as="form" spacing={5} onSubmit={handleSubmit}>
          {getNotionTableColumsData.map((_column) => {
            const shouldRenderSelect = _column.type === 'multi_select';

            if (shouldRenderSelect) {
              return (
                <SelectControl
                  key={_column.columnName}
                  label={_column.columnName}
                  name={_column.columnName}
                >
                  {_column.options.map((_option) => (
                    <option key={_option} value={_option}>
                      {_option}
                    </option>
                  ))}
                </SelectControl>
              );
            }

            return (
              <InputControl
                key={_column.columnName}
                isRequired
                label={_column.columnName}
                name={_column.columnName}
              />
            );
          })}
          <Button type="submit" width="full">
            Save word
          </Button>
        </VStack>
      </Card>
    );
  };

  return (
    <Box bg="gray.50" height="100%" overflow="hidden">
      <ParticlesBackground />
      <Flex align="center" h="100%" justify="center" w="100%">
        {renderContent()}
      </Flex>
    </Box>
  );
};
