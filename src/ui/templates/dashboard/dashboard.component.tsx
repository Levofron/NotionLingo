import { Container, Fade, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { INotionWord } from '@domain/rest/rest.models';

import { restModule } from '@adapter';

import { Box, Button, Flex, ParticlesBackground, Text } from '@ui/atoms';
import {
  FullScreenLoader,
  NotionWordCardAnimationWrapper,
  NotionWordCardBack,
  NotionWordCardFront,
} from '@ui/molecules';

import { useAxiosAction } from '@infrastructure/utils';

export const DashboardTemplate = (): JSX.Element => {
  const toast = useToast();
  const [words, setWords] = useState<INotionWord[]>([]);

  const { loading: isGetRandomNotionWordsLoading, mutateAsync: mutateAsyncGetRandomNotionWords } =
    useAxiosAction(restModule.getRandomNotionWords);

  const { mutate: mutateIncreaseDailyStreak } = useAxiosAction(restModule.increaseDailyStreak);

  const fetchMoreWords = () =>
    mutateAsyncGetRandomNotionWords()
      .then((_response) => {
        setWords((_prevState) => [..._response, ..._prevState]);
      })
      .catch((_error) => {
        toast({
          title: 'Error',
          duration: 5000,
          status: 'error',
          isClosable: true,
          description: _error,
        });
      });

  useEffect(() => {
    fetchMoreWords();
  }, []);

  const handleNotionWordCardClick = (notionWord: INotionWord) => () => {
    const copiedWords = [...words];

    copiedWords.splice(copiedWords.indexOf(notionWord), 1);
    setWords(copiedWords);

    mutateIncreaseDailyStreak();

    if (copiedWords.length <= 3) {
      fetchMoreWords();
    }
  };

  const renderContent = () => {
    if (isGetRandomNotionWordsLoading && words.length === 0) {
      return (
        <FullScreenLoader
          backgroundColor="transparent"
          flexDirection="column"
          gap={{ base: 3, sm: 5 }}
          position="relative"
        >
          <Text fontWeight="medium">Loading words...</Text>
        </FullScreenLoader>
      );
    }

    if (words.length === 0) {
      return (
        <Flex
          alignItems="center"
          flexDirection="column"
          gap={{ base: 3, sm: 5 }}
          justifyContent="center"
        >
          <Text fontWeight="medium" maxWidth="300px" textAlign="center">
            No words found. Please fill up your Notion database with words.
          </Text>
          <Button size={{ base: 'sm', sm: 'md', md: 'lg' }} onClick={fetchMoreWords}>
            Refetch
          </Button>
        </Flex>
      );
    }

    return (
      <Flex alignItems="center" height="100%" justifyContent="center">
        {words.map((_word, _index) => {
          const isTopCard = _index === words.length - 1;

          return (
            <NotionWordCardAnimationWrapper
              key={_word.word}
              isDraggable={isTopCard}
              zIndex={_index}
              onScreenExit={handleNotionWordCardClick(_word)}
            >
              {({ isRotated, ..._additionalProps }) => (
                <>
                  {!isRotated ? (
                    <Fade in={isTopCard}>
                      <NotionWordCardFront {..._word} {..._additionalProps} />
                    </Fade>
                  ) : (
                    <NotionWordCardBack word={_word.word} />
                  )}
                </>
              )}
            </NotionWordCardAnimationWrapper>
          );
        })}
      </Flex>
    );
  };

  return (
    <Box bg="gray.50" height="100%" overflow="hidden">
      <ParticlesBackground />
      <Container height="100%" maxW="6xl" position="relative" pt={{ base: 66, md: 74 }}>
        {renderContent()}
      </Container>
    </Box>
  );
};
