import { Fade } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import { Button, Container, Flex, Text } from '@ui/atoms';
import {
  DashboardProfileDetails,
  FullScreenLoader,
  ParticlesBackgroundLayout,
} from '@ui/molecules';
import {
  NotionWordCardAnimationWrapper,
  NotionWordCardBack,
  NotionWordCardFront,
} from '@ui/organisms';

import { useIncreaseStreak, useRandomWords, useUpdateWord } from '@adapter/hooks';

import { removeNotionWordFromArray, updateRecordInNotionWordArray } from '@domain/rest/helpers';
import {
  IIncreaseDailyStreak,
  INotionWord,
  IUpdateNotionWordRequest,
} from '@domain/rest/rest.types';

import { useToast, useUser } from '@infrastructure/utils';

export const DashboardTemplate = (): JSX.Element => {
  const toast = useToast();
  const { user } = useUser();
  const [words, setWords] = useState<INotionWord[]>([]);

  const [dailyStreakData, setDailyStreakData] = useState<IIncreaseDailyStreak>({
    daysInStreak: user?.daysInStreak || 0,
    todayWordsStreak: user?.todayWordsStreak || 0,
    totalLearnedWords: user?.totalLearnedWords || 0,
  });

  const { increaseStreak } = useIncreaseStreak();
  const { isUpdateWordLoading, updateWord } = useUpdateWord();
  const { getRandomWords, isRandomWordsLoading } = useRandomWords();

  const fetchMoreWords = useCallback(
    () =>
      getRandomWords()
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
    const newWords = removeNotionWordFromArray(words, notionWord);

    setWords(newWords);
    increaseStreak().then(setDailyStreakData);

    if (newWords.length <= 3) {
      fetchMoreWords();
    }
  };

  const handleApplySuggestion = (data: IUpdateNotionWordRequest) => () =>
    updateWord(data)
      .then((_udpatedRecordId) => {
        const updatedNotionWords = updateRecordInNotionWordArray(words, _udpatedRecordId, data);

        if (!updatedNotionWords) {
          return;
        }

        setWords(updatedNotionWords);

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
    if (isRandomWordsLoading && words.length === 0) {
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
                        isLoading={isTopCard && isUpdateWordLoading}
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
    <ParticlesBackgroundLayout height="100%">
      <Container height="100%" maxW="6xl" position="relative" pt={{ base: 58, sm: 66, md: 74 }}>
        <DashboardProfileDetails {...dailyStreakData} />
        {renderContent()}
      </Container>
    </ParticlesBackgroundLayout>
  );
};
