import { Container, Fade, useToast } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import { INotionWord } from '@domain/rest/rest.models';

import { restModule } from '@adapter/modules';

import { Box, Flex, TinderAnimationWrapper } from '@ui/atoms';
import { NotionWordCard } from '@ui/molecules';

import { useAxiosAction } from '@infrastructure/utils';

import { IDashboardProps } from './dashboard.types';

export const DashboardTemplate: FC<IDashboardProps> = (): JSX.Element => {
  const toast = useToast();
  const [words, setWords] = useState<INotionWord[]>([]);

  const { mutateAsync: mutateAsyncGetRandomNotionWords } = useAxiosAction(
    restModule.getRandomNotionWords,
  );

  const fetchMoreWords = () =>
    mutateAsyncGetRandomNotionWords()
      .then((_response) => {
        setWords((_prevState) => [..._response, ..._prevState]);
      })
      .catch((_error) => {
        toast({
          title: 'Error',
          description: _error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });

  useEffect(() => {
    fetchMoreWords();
  }, []);

  const handleNotionWordCardClick = (notionWord: INotionWord) => () => {
    const copiedWords = [...words];

    copiedWords.splice(copiedWords.indexOf(notionWord), 1);

    setWords(copiedWords);

    if (copiedWords.length < 3) {
      fetchMoreWords();
    }
  };

  return (
    <Box bg="gray.50" height="100%">
      <Container height="100%" maxW="6xl" position="relative" pt={{ base: 66, md: 74 }}>
        <Flex alignItems="center" height="100%" justifyContent="center">
          {words.map((_word, _index) => {
            const isTopCard = _index === words.length - 1;

            return (
              <TinderAnimationWrapper
                key={_word.word}
                isDraggable={isTopCard}
                zIndex={_index}
                onScreenExit={handleNotionWordCardClick(_word)}
              >
                {(_additionalProps) => (
                  <Fade in={isTopCard}>
                    <NotionWordCard {..._word} {..._additionalProps} />
                  </Fade>
                )}
              </TinderAnimationWrapper>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
};
