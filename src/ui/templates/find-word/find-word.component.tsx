import { ChangeEvent } from 'react';

import { restModule } from '@adapter/modules';

import { Box, Container, Divider, Flex, Heading, Text } from '@ui/atoms';
import { InputControl } from '@ui/molecules';

import { debounce, useAxiosAction } from '@infrastructure/utils';

export const FindWordTemplate = (): JSX.Element => {
  const {
    data: getWordSuggestionsData,
    error: getWordSuggestionsError,
    loading: isGetWordSuggestionsLoading,
    mutateAsync: mutateAsyncGetWordSuggestions,
  } = useAxiosAction(restModule.getWordSuggestions);

  const handleInputChange = debounce(async (event: ChangeEvent<HTMLInputElement>) => {
    const result = await mutateAsyncGetWordSuggestions(event.target.value);

    console.log(result);
  }, 1000);

  return (
    <Box bg="gray.50" height="100%">
      <Container height="100%" maxW="6xl" position="relative" pt={{ base: 66, md: 74 }}>
        <Flex alignItems="center" flexDirection="column" gap={{ base: 5, sm: 6, md: 8 }}>
          <Flex direction="column" mt={{ base: '25px', md: '40px' }} w="100%">
            <InputControl
              isRequired
              errorMessage={getWordSuggestionsError || undefined}
              isDisabled={isGetWordSuggestionsLoading}
              isLoading={isGetWordSuggestionsLoading}
              label="Search for a word"
              name="searchWord"
              placeholder="Your search word"
              onChange={handleInputChange}
            />
          </Flex>
          <Heading as="h1" color="gray.900" fontSize="4xl">
            {getWordSuggestionsData?.word}
          </Heading>
          <Text color="gray.900" fontSize="lg">
            Meaning and examples
          </Text>
          {getWordSuggestionsData?.meaningAndExamples ? (
            <Flex flexDirection="column" gap={{ base: 1, sm: 2, md: 4 }}>
              {getWordSuggestionsData.meaningAndExamples.map(({ examples, meaning }, _index) => (
                <Flex
                  key={`${meaning}-${examples.join('-')}`}
                  flexDirection="column"
                  gap={{ base: 1, sm: 2, md: 4 }}
                >
                  <Heading color="gray.900" textAlign="left">
                    {meaning}
                  </Heading>
                  {examples.map((example) => (
                    <Text key={example} withBalancer fontWeight="light">
                      {example}
                    </Text>
                  ))}
                  {_index !== getWordSuggestionsData.meaningAndExamples.length - 1 ? (
                    <Divider bg="gray.900" height="1px" width="100%" />
                  ) : null}
                </Flex>
              ))}
            </Flex>
          ) : null}
        </Flex>
      </Container>
    </Box>
  );
};
