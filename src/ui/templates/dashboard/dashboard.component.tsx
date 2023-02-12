import { Fade, useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import { IIncreaseDailyStreak, INotionWord } from '@domain/rest/rest.models';

import { restModule } from '@adapter';

import { Box, Button, Container, Flex, ParticlesBackground, Text } from '@ui/atoms';
import {
  DashboardProfileDetails,
  FullScreenLoader,
  NotionWordCardAnimationWrapper,
  NotionWordCardBack,
  NotionWordCardFront,
} from '@ui/molecules';

import { useAxiosAction, useUser } from '@infrastructure/utils';

export const DashboardTemplate = (): JSX.Element => {
  const toast = useToast();
  const { user } = useUser();
  const [words, setWords] = useState<INotionWord[]>([]);

  const [dailyStreakData, setDailyStreakData] = useState<IIncreaseDailyStreak>({
    daysInStreak: user?.daysInStreak || 0,
    todayWordsStreak: user?.todayWordsStreak || 0,
    totalLearnedWords: user?.totalLearnedWords || 0,
  });

  const { loading: isGetRandomNotionWordsLoading, mutateAsync: mutateAsyncGetRandomNotionWords } =
    useAxiosAction(restModule.getRandomNotionWords);

  const { mutateAsync: mutateAsyncIncreaseDailyStreak } = useAxiosAction(
    restModule.increaseDailyStreak,
  );

  const fetchMoreWords = useCallback(
    () =>
      mutateAsyncGetRandomNotionWords()
        .then((_response) => {
          setWords((_prevState) => [..._response, ..._prevState]);
        })
        .catch((_error) => {
          toast({
            duration: 5000,
            title: 'Error!',
            status: 'error',
            isClosable: true,
            description: _error,
          });
        }),
    [setWords],
  );

  useEffect(() => {
    fetchMoreWords();
  }, []);

  const handleNotionWordCardClick = (notionWord: INotionWord) => () => {
    const copiedWords = [...words];

    copiedWords.splice(copiedWords.indexOf(notionWord), 1);
    setWords(copiedWords);

    mutateAsyncIncreaseDailyStreak().then((_response) => {
      setDailyStreakData(_response);
    });

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
          <Button
            leftIcon={<FiRefreshCcw />}
            size={{ base: 'sm', sm: 'md', md: 'lg' }}
            onClick={fetchMoreWords}
          >
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
                      <NotionWordCardFront notionWord={_word} {..._additionalProps} />
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
        <DashboardProfileDetails {...dailyStreakData} />
        {renderContent()}
      </Container>
    </Box>
  );
};
