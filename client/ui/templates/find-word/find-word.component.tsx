import { queryTypes, useQueryState } from 'next-usequerystate';
import { ChangeEvent, Children, FC, useEffect, useRef } from 'react';
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
    data: getDictionarySuggestionsData,
    error: getDictionarySuggestionsError,
    isLoading: isGetDictionarySuggestionsLoading,
    mutate: mutateGetDictionarySuggestions,
  } = useAxios(restModule.getDictionarySuggestions);

  useEffect(() => {
    if (isString(word)) {
      mutateGetDictionarySuggestions(word);
    }
  }, [!!word]);

  const handleInputChange = debounce(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    mutateGetDictionarySuggestions(value);

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
          errorMessage={getDictionarySuggestionsError || undefined}
          isLoading={isGetDictionarySuggestionsLoading}
          label="Search for a word"
          name="searchWord"
          placeholder="Your search word"
          onChange={handleInputChange}
        />
        {getDictionarySuggestionsData?.word ? (
          <Heading
            as="h1"
            color="gray.900"
            cursor="pointer"
            fontSize={{ base: '3xl', sm: '4xl' }}
            onClick={handleCopy(getDictionarySuggestionsData.word)}
          >
            {getDictionarySuggestionsData.word}
          </Heading>
        ) : null}
        {getDictionarySuggestionsData ? (
          <Flex flexDirection="column" gap={{ base: 2, md: 4 }} w="100%">
            {Children.toArray(
              getDictionarySuggestionsData?.suggestions.map(({ example, meaning }, _index) => {
                const isLastIndex = _index === getDictionarySuggestionsData.suggestions.length - 1;

                return (
                  <Flex flexDirection="column" gap={{ base: 2, md: 4 }}>
                    <Flex alignItems="flex-start" gap={{ base: 2, md: 4 }}>
                      {isUserAuthenticated ? (
                        <MotionIconButton
                          icon={BsPlusCircle}
                          onClick={handleAddNotionWordClick(
                            getDictionarySuggestionsData.word,
                            meaning,
                            example,
                          )}
                        />
                      ) : null}
                      <Flex flexDirection="column" gap={{ base: 2, md: 4 }} w="100%">
                        <Heading
                          withBalancer
                          color="gray.900"
                          cursor="pointer"
                          fontSize={{ base: 'md', sm: 'xl' }}
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
              }),
            )}
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
  );
};
