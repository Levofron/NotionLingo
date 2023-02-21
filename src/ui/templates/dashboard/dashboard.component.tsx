import { Fade } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import { Box, Button, Container, Flex, ParticlesBackground, Text } from '@ui/atoms';
import {
  DashboardProfileDetails,
  FullScreenLoader,
  NotionWordCardAnimationWrapper,
  NotionWordCardBack,
  NotionWordCardFront,
} from '@ui/molecules';

import { restModule } from '@adapter/modules';

import {
  IIncreaseDailyStreak,
  INotionWord,
  IUpdateNotionWordRequest,
} from '@domain/entities/rest.types';

import { useAxios, useToast, useUser } from '@infrastructure/utils';

export const DashboardTemplate = (): JSX.Element => {
  const toast = useToast();
  const { user } = useUser();
  const [words, setWords] = useState<INotionWord[]>([]);

  const [dailyStreakData, setDailyStreakData] = useState<IIncreaseDailyStreak>({
    daysInStreak: user?.daysInStreak || 0,
    todayWordsStreak: user?.todayWordsStreak || 0,
    totalLearnedWords: user?.totalLearnedWords || 0,
  });

  const { isLoading: isGetRandomNotionWordsLoading, mutateAsync: mutateAsyncGetRandomNotionWords } =
    useAxios(restModule.getRandomNotionWords);

  const { mutateAsync: mutateAsyncIncreaseDailyStreak } = useAxios(restModule.increaseDailyStreak);

  const { isLoading: isUpdateNotionWordLoading, mutateAsync: mutateAsyncUpdateNotionWord } =
    useAxios(restModule.updateNotionWord);

  const fetchMoreWords = useCallback(
    () =>
      mutateAsyncGetRandomNotionWords()
        .then((_response) => setWords((_prevState) => [..._response, ..._prevState]))
        .catch((_error) =>
          toast.error({
            description: _error,
          }),
        ),
    [setWords],
  );

  useEffect(() => {
    fetchMoreWords();
  }, []);

  const handleNotionWordCardClick = (notionWord: INotionWord) => () => {
    const copiedWords = [...words];

    copiedWords.splice(copiedWords.indexOf(notionWord), 1);
    setWords(copiedWords);

    mutateAsyncIncreaseDailyStreak().then(setDailyStreakData);

    if (copiedWords.length <= 3) {
      fetchMoreWords();
    }
  };

  const handleApplySuggestion = (data: IUpdateNotionWordRequest) => () =>
    mutateAsyncUpdateNotionWord(data)
      .then((_udpatedRecordId) => {
        const copiedWords = [...words];

        const foundWord = copiedWords.find((_word) => _word.id === _udpatedRecordId);

        if (!foundWord) {
          return;
        }

        const foundWordIndex = copiedWords.indexOf(foundWord);

        const updatedWord: INotionWord = {
          ...foundWord,
          meaning: data.meaning || foundWord.meaning,
          exampleSentence: data.exampleSentence || foundWord.exampleSentence,
        };

        copiedWords[foundWordIndex] = updatedWord;

        setWords(copiedWords);

        toast.success({
          duration: 3000,
          description: 'Suggestions applied!',
        });
      })
      .catch((_error) =>
        toast.error({
          duration: 3000,
          description: _error,
        }),
      );

  const renderContent = () => {
    if (isGetRandomNotionWordsLoading && words.length === 0) {
      return (
        <FullScreenLoader
          backgroundColor="transparent"
          flexDirection="column"
          gap={{ base: 3, sm: 5 }}
          position="relative"
          zIndex={1}
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
            No words found. Please fill up your <b>Notion</b> database with words.
          </Text>
          <Button leftIcon={<FiRefreshCcw />} onClick={fetchMoreWords}>
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
                  {isRotated ? (
                    <NotionWordCardBack word={_word.word} />
                  ) : (
                    <Fade in={isTopCard}>
                      <NotionWordCardFront
                        isLoading={isTopCard && isUpdateNotionWordLoading}
                        notionWord={_word}
                        onApplySuggestions={handleApplySuggestion({
                          id: _word.id,
                          meaning: _word.meaningSuggestion,
                          exampleSentence: _word.exampleSentenceSuggestion,
                        })}
                        {..._additionalProps}
                      />
                    </Fade>
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
        <DashboardProfileDetails {...dailyStreakData} />
        {renderContent()}
      </Container>
    </Box>
  );
};
