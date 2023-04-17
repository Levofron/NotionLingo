import { Fade } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import { Button, Container, Flex, Text } from '@presentation/atoms';
import {
  DashboardProfileDetails,
  FullScreenLoader,
  ParticlesBackgroundLayout,
} from '@presentation/molecules';
import {
  NotionWordCardAnimationWrapper,
  NotionWordCardBack,
  NotionWordCardFront,
  SidebarWithHeader,
} from '@presentation/organisms';

import { DashboardProps } from './dashboard.types';

export const Dashboard: FC<DashboardProps> = ({
  dailyStreakData,
  fetchMoreWords,
  isRandomWordsLoading,
  isUpdateWordLoading,
  onApplySuggestion,
  onNotionWordCardClick,
  words,
}) => {
  const contentToRender = useMemo(() => {
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
              key={_word.id}
              isDraggable={isTopCard}
              zIndex={_index}
              onScreenExit={onNotionWordCardClick(_word)}
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
                        onApplySuggestions={onApplySuggestion({
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
  }, [isRandomWordsLoading, isUpdateWordLoading, onApplySuggestion, onNotionWordCardClick, words]);

  return (
    <>
      <SidebarWithHeader />
      <ParticlesBackgroundLayout height="100%">
        <Container height="100%" maxW="6xl" position="relative" pt={{ base: 58, sm: 66, md: 74 }}>
          <DashboardProfileDetails {...dailyStreakData} />
          {contentToRender}
        </Container>
      </ParticlesBackgroundLayout>
    </>
  );
};
