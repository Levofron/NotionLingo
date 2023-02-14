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
    mutate: mutateGetWordSuggestions,
  } = useAxiosAction(restModule.getWordSuggestions);

  const handleInputChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    mutateGetWordSuggestions(event.target.value);
  }, 1000);

  const isEmpty =
    getWordSuggestionsData &&
    !getWordSuggestionsData?.meaningAndExamples?.length &&
    !getWordSuggestionsData?.word &&
    !getWordSuggestionsData?.additionalExamples.length;

  return (
    <Box bg="gray.50" height="100%">
      <Container height="100%" maxW="6xl" position="relative" pt={{ base: 66, md: 74 }}>
        <Flex
          alignItems="center"
          flexDirection="column"
          gap={{ base: 5, sm: 6, md: 8 }}
          pb={{ base: 14, sm: 20 }}
          pt={{ base: 6, sm: 10 }}
        >
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
          {getWordSuggestionsData?.word ? (
            <Heading as="h1" color="gray.900" fontSize="4xl">
              {getWordSuggestionsData?.word}
            </Heading>
          ) : null}
          {!isEmpty ? (
            <Flex flexDirection="column" gap={{ base: 1, sm: 2, md: 4 }}>
              {getWordSuggestionsData?.meaningAndExamples.map(({ examples, meaning }, _index) => {
                const example = examples[0] || getWordSuggestionsData.additionalExamples[0];
                const isLastIndex = _index === getWordSuggestionsData.meaningAndExamples.length - 1;

                const key = `${meaning}-${example}-${_index}`;

                return (
                  <Flex key={key} flexDirection="column" gap={{ base: 1, sm: 2, md: 4 }}>
                    <Heading withBalancer color="gray.900" textAlign="left">
                      {meaning}
                    </Heading>
                    {example ? (
                      <Text key={example} withBalancer fontWeight="light">
                        {example}
                      </Text>
                    ) : null}
                    {!isLastIndex ? <Divider bg="gray.900" height="1px" width="100%" /> : null}
                  </Flex>
                );
              })}
            </Flex>
          ) : (
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
                No meaning and examples found.
              </Text>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
};
