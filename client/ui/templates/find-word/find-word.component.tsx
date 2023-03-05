import { queryTypes, useQueryState } from 'next-usequerystate';
import { ChangeEvent, FC, useEffect, useRef } from 'react';
import { BsPlusCircle } from 'react-icons/bs';

import { Container, Divider, Flex, Heading, Text } from '@ui/atoms';
import { InputControl, MotionIconButton } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { ERoutes } from '@infrastructure/types/routes';
import {
  debounce,
  isString,
  useAxios,
  useCopyToClipboard,
  useRouter,
  useToast,
} from '@infrastructure/utils';

import { IFindWordTemplateProps } from './find-word.types';

export const FindWordTemplate: FC<IFindWordTemplateProps> = ({
  isUserAuthenticated,
}): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { copyToClipboard } = useCopyToClipboard();
  const [word, setWord] = useQueryState('word', queryTypes.string);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const {
    data: getWordSuggestionsData,
    error: getWordSuggestionsError,
    isLoading: isGetWordSuggestionsLoading,
    mutate: mutateGetWordSuggestions,
  } = useAxios(restModule.getWordSuggestions);

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

  const handleCopy = (string: string) => async () =>
    copyToClipboard(string).then(() =>
      toast.info({
        duration: 2000,
        description: 'Copied to clipboard',
      }),
    );

  return (
    <Container height="100%" maxW="6xl" position="relative" pt={{ base: 58, sm: 66, md: 74 }}>
      <Flex
        alignItems="center"
        flexDirection="column"
        gap={{ base: 5, sm: 6, md: 8 }}
        pb={{ base: 14, sm: 20 }}
        pt={{ base: 6, sm: 10 }}
      >
        <InputControl
          ref={inputRef}
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
          <Flex flexDirection="column" gap={{ base: 1, sm: 2, md: 4 }} w="100%">
            {getWordSuggestionsData?.meaningAndExamples.map(({ examples, meaning }, _index) => {
              const example = examples[0] || getWordSuggestionsData.additionalExamples[0];

              if (!example || !meaning) {
                return null;
              }

              const key = `${meaning}-${example}-${_index}`;
              const isLastIndex = _index === getWordSuggestionsData.meaningAndExamples.length - 1;

              return (
                <Flex key={key} flexDirection="column" gap={{ base: 1, sm: 2, md: 4 }}>
                  <Flex alignItems="flex-start" gap={{ base: 1, sm: 2, md: 4 }}>
                    {isUserAuthenticated ? (
                      <MotionIconButton
                        icon={BsPlusCircle}
                        onClick={handleAddNotionWordClick(
                          getWordSuggestionsData.word,
                          meaning,
                          example,
                        )}
                      />
                    ) : null}
                    <Flex flexDirection="column" gap={{ base: 1, sm: 2, md: 4 }} w="100%">
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
  );
};
