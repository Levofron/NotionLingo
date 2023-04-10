import { FC, useEffect, useRef } from 'react';
import { BsPlusCircle } from 'react-icons/bs';

import { Box, Container, Divider, Flex, Heading, Text } from '@presentation/atoms';
import {
  FullScreenLoader,
  InputControl,
  MotionIconButton,
  ParticlesBackgroundLayout,
} from '@presentation/molecules';
import { SidebarWithHeader } from '@presentation/organisms';

import { IFindWordProps } from './find-word.types';

export const FindWord: FC<IFindWordProps> = ({
  dictionarySuggestions,
  dictionarySuggestionsError,
  hasSessionUser,
  isDictionarySuggestionsLoading,
  onAddWordClick,
  onCopy,
  onInputChange,
  queryStateWord,
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current, queryStateWord]);

  return (
    <>
      <SidebarWithHeader />
      <ParticlesBackgroundLayout height="100%">
        <Box height="100%" overflow="scroll" width="100%">
          {hasSessionUser ? (
            <Container
              height="100%"
              maxW="6xl"
              position="relative"
              pt={{ base: 58, sm: 66, md: 74 }}
            >
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
                  defaultValue={queryStateWord || ''}
                  errorMessage={dictionarySuggestionsError || undefined}
                  isLoading={isDictionarySuggestionsLoading}
                  label="Search for a word"
                  name="searchWord"
                  placeholder="Your search word"
                  onChange={onInputChange}
                />
                {dictionarySuggestions?.word ? (
                  <Heading
                    as="h1"
                    color="gray.900"
                    cursor="pointer"
                    fontSize={{ base: '3xl', sm: '4xl' }}
                    onClick={onCopy(dictionarySuggestions.word)}
                  >
                    {dictionarySuggestions.word}
                  </Heading>
                ) : null}
                {dictionarySuggestions ? (
                  <Flex flexDirection="column" gap={{ base: 2, md: 4 }} w="100%">
                    {dictionarySuggestions?.suggestions.map(({ example, meaning }, _index) => {
                      const key = `${dictionarySuggestions.word}-${meaning}-${example}`;
                      const isLastIndex = _index === dictionarySuggestions.suggestions.length - 1;

                      return (
                        <Flex key={key} flexDirection="column" gap={{ base: 2, md: 4 }}>
                          <Flex alignItems="flex-start" gap={{ base: 2, md: 4 }}>
                            {hasSessionUser ? (
                              <MotionIconButton
                                icon={BsPlusCircle}
                                onClick={onAddWordClick(
                                  dictionarySuggestions.word,
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
                                onClick={onCopy(meaning)}
                              >
                                {meaning}
                              </Heading>
                              <Text
                                key={example}
                                withBalancer
                                cursor="pointer"
                                fontWeight="light"
                                onClick={onCopy(example)}
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
          ) : (
            <FullScreenLoader
              backgroundColor="transparent"
              flexDirection="column"
              gap={{ base: 3, sm: 5 }}
              position="relative"
              zIndex={1}
            />
          )}
        </Box>
      </ParticlesBackgroundLayout>
    </>
  );
};
