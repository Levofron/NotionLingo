import { useClipboard } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { queryTypes, useQueryState } from 'next-usequerystate';
import { ChangeEvent, useEffect } from 'react';
import { BsPlusCircle } from 'react-icons/bs';

import { Box, Container, Divider, Flex, Heading, Icon, Text } from '@ui/atoms';
import { InputControl } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { ERoutes } from '@infrastructure/types/routes';
import { debounce, isString, useAxiosAction, useRouter, useToast } from '@infrastructure/utils';

export const FindWordTemplate = (): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const { onCopy, setValue, value } = useClipboard('');
  const [word, setWord] = useQueryState('word', queryTypes.string);

  useEffect(() => {
    if (value) {
      onCopy();

      toast.info({
        duration: 2000,
        description: 'Copied to clipboard',
      });
    }
  }, [value]);

  const {
    data: getWordSuggestionsData,
    error: getWordSuggestionsError,
    isLoading: isGetWordSuggestionsLoading,
    mutate: mutateGetWordSuggestions,
  } = useAxiosAction(restModule.getWordSuggestions);

  useEffect(() => {
    if (isString(word)) {
      mutateGetWordSuggestions(word);
    }
  }, [!!word]);

  const handleInputChange = debounce(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    mutateGetWordSuggestions(value);

    setWord(value);
  }, 1000);

  const handleAddNotionWordClick = (word: string, meaning: string, exampleSentence: string) => () =>
    router.push({
      pathname: ERoutes.ADD_WORD,
      query: {
        word,
        meaning,
        exampleSentence,
      },
    });

  const isEmpty =
    getWordSuggestionsData &&
    !getWordSuggestionsData?.meaningAndExamples?.length &&
    !getWordSuggestionsData?.word &&
    !getWordSuggestionsData?.additionalExamples.length;

  const handleCopy = (string: string) => () => setValue(string);

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
            defaultValue={word || ''}
            errorMessage={getWordSuggestionsError || undefined}
            isDisabled={isGetWordSuggestionsLoading}
            isLoading={isGetWordSuggestionsLoading}
            label="Search for a word"
            name="searchWord"
            placeholder="Your search word"
            onChange={handleInputChange}
          />
          {getWordSuggestionsData?.word ? (
            <Heading
              as="h1"
              color="gray.900"
              cursor="pointer"
              fontSize="4xl"
              onClick={handleCopy(getWordSuggestionsData.word)}
            >
              {getWordSuggestionsData.word}
            </Heading>
          ) : null}
          {isEmpty ? (
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
          ) : (
            <Flex flexDirection="column" gap={{ base: 1, sm: 2, md: 4 }}>
              {getWordSuggestionsData?.meaningAndExamples.map(({ examples, meaning }, _index) => {
                const example = examples[0] || getWordSuggestionsData.additionalExamples[0];

                if (!example || !meaning) {
                  return null;
                }

                const isLastIndex = _index === getWordSuggestionsData.meaningAndExamples.length - 1;

                const key = `${meaning}-${example}-${_index}`;

                return (
                  <Flex key={key} flexDirection="column" gap={{ base: 1, sm: 2, md: 4 }}>
                    <Flex alignItems="flex-start" gap={{ base: 1, sm: 2, md: 4 }}>
                      <motion.button
                        animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
                        whileHover={{
                          scale: 1.2,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 1 }}
                      >
                        <Icon
                          as={BsPlusCircle}
                          bg="gray.50"
                          borderRadius="999px"
                          cursor="pointer"
                          fontSize={{ base: '5xl', md: '6xl' }}
                          p={1}
                          onClick={handleAddNotionWordClick(
                            getWordSuggestionsData.word,
                            meaning,
                            example,
                          )}
                        />
                      </motion.button>
                      <Flex flexDirection="column" gap={{ base: 1, sm: 2, md: 4 }}>
                        <Heading
                          withBalancer
                          color="gray.900"
                          cursor="pointer"
                          textAlign="left"
                          onClick={handleCopy(meaning)}
                        >
                          {meaning}
                        </Heading>
                        <Text
                          key={example}
                          withBalancer
                          cursor="pointer"
                          fontWeight="light"
                          onClick={handleCopy(example)}
                        >
                          {example}
                        </Text>
                      </Flex>
                    </Flex>
                    {isLastIndex ? null : <Divider bg="gray.900" height="1px" width="100%" />}
                  </Flex>
                );
              })}
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
};
