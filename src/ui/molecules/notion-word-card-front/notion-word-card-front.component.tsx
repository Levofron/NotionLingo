import Image from 'next/image';
import { FC, useCallback, useMemo } from 'react';
import { AiTwotoneSound } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';

import { localStorageModule, speechSynthesisModule } from '@adapter';

import { Box, Button, Card, Flex, Heading, Icon, Text } from '@ui/atoms';

import { useKeyPressMapper } from '@infrastructure/utils';

import { INotionWordCardFrontProps } from './notion-word-card-front.types';

const hasSuggestion = (original: string, suggestion?: string) =>
  !!suggestion && suggestion.length > 0 && suggestion !== original;

export const NotionWordCardFront: FC<INotionWordCardFrontProps> = ({
  countdown,
  isCountdownEnded,
  isTopCard,
  notionWord: {
    exampleSentence,
    exampleSentenceSuggestion,
    imageUrl,
    ipa,
    meaning,
    meaningSuggestion,
    type,
    word,
  },
  onClick,
}): JSX.Element => {
  const hasType = type && type.length > 0;

  const renderTypes = useCallback(() => {
    const typeAsArray = Array.isArray(type) ? type! : [type!];

    return typeAsArray.map((_type) => (
      <Box key={_type} bg="gray.900" color="gray.50" px={2} py={1}>
        <Text fontSize="xs" fontWeight="medium">
          {_type}
        </Text>
      </Box>
    ));
  }, []);

  const handleSpeak = useCallback(() => {
    speechSynthesisModule.speak(word);
  }, []);

  useKeyPressMapper([[['KeyP', 'KeyS'], handleSpeak]], !isTopCard);

  const shouldEnableSpeechFeature = useMemo(
    () => localStorageModule.isSupported() && speechSynthesisModule.isSupported(),
    [],
  );

  const hasMeaningSuggestion = useMemo(
    () => hasSuggestion(meaning, meaningSuggestion),
    [meaningSuggestion],
  );

  const hasExampleSentenceSuggestion = useMemo(
    () => hasSuggestion(exampleSentence, exampleSentenceSuggestion),
    [exampleSentenceSuggestion],
  );

  return (
    <Card w={{ base: 300, sm: 350, md: 400 }}>
      <Box
        borderBottom="2px solid"
        borderColor="gray.900"
        h={{ base: '180px', sm: '205px', md: '240px' }}
        pointerEvents="none"
        position="relative"
      >
        <Image fill alt={`Image representing '${word}' word`} src={imageUrl} />
      </Box>
      <Flex flexDirection="column" gap={1} p={{ base: 2, sm: 3, md: 4 }}>
        {hasType ? (
          <Flex gap={2} mb={{ base: 0, sm: 1, md: 2 }}>
            {renderTypes()}
          </Flex>
        ) : null}
        <Flex flexDirection="column">
          {shouldEnableSpeechFeature ? (
            <Flex cursor="pointer" gap={1} width="fit-content" onClick={handleSpeak}>
              <Icon as={AiTwotoneSound} color="gray.900" fontSize="20" mt={1} />
              <Heading
                color="gray.900"
                fontSize={{ base: 'xl', sm: '2xl' }}
                mt={{ base: 0, sm: 0 }}
                noOfLines={{ base: 2, sm: 3 }}
                wordBreak="break-word"
              >
                {word}
              </Heading>
            </Flex>
          ) : (
            <Heading
              color="gray.900"
              fontSize={{ base: 'xl', sm: '2xl' }}
              mt={{ base: 0, sm: 0 }}
              noOfLines={{ base: 2, sm: 3 }}
              wordBreak="break-word"
            >
              {word}
            </Heading>
          )}
          {ipa ? (
            <Text color="gray.500" fontSize="xs">
              {ipa}
            </Text>
          ) : null}
        </Flex>
        {hasMeaningSuggestion ? (
          <Box position="relative">
            <Button position="absolute" right={0} size="xs" top={-6}>
              Apply suggestion
            </Button>
            <Text
              border="2px solid"
              borderColor="gray.900"
              color="gray.900"
              fontSize={{ base: 'sm', sm: 'md' }}
              noOfLines={{ base: 4, md: 5 }}
              p={{ base: 1, sm: 2 }}
            >
              {meaningSuggestion}
            </Text>
          </Box>
        ) : (
          <Text
            withBalancer
            color="gray.500"
            fontSize={{ base: 'sm', sm: 'md' }}
            noOfLines={{ base: 4, md: 5 }}
          >
            {meaning}
          </Text>
        )}
      </Flex>
      <Flex borderTop="2px solid" borderTopColor="gray.900" justifyContent="space-between">
        <Flex gap={1} width="fit-content">
          {hasExampleSentenceSuggestion ? (
            <Flex
              flexDirection="column"
              p={{ base: 2, sm: 3, md: 4 }}
              position="relative"
              width="full"
            >
              <Button size="xs">Apply suggestion</Button>
              <Text
                border="2px solid"
                borderColor="gray.900"
                color="gray.900"
                fontSize={{ base: 'sm', sm: 'md' }}
                noOfLines={{ base: 4, md: 5 }}
                p={{ base: 1, sm: 2 }}
              >
                {exampleSentenceSuggestion}
              </Text>
            </Flex>
          ) : (
            <Text
              withBalancer
              color="gray.900"
              fontSize={{ base: 'sm', sm: 'md' }}
              noOfLines={{ base: 4, md: 5 }}
              p={{ base: 2, sm: 3, md: 4 }}
            >
              {exampleSentence}
            </Text>
          )}
        </Flex>
        <Flex
          _hover={{
            bg: 'gray.900',
            color: 'gray.50',
            borderColor: 'gray.900',
          }}
          alignItems="center"
          borderLeft="2px solid"
          borderTopColor="gray.900"
          cursor="pointer"
          justifyContent="center"
          maxWidth="120px"
          minHeight="50px"
          minWidth="100px"
          transition="all .3s ease"
          onClick={onClick}
        >
          {isCountdownEnded ? <BsHeart fontSize="40px" /> : <Text fontSize="xl">{countdown}</Text>}
        </Flex>
      </Flex>
    </Card>
  );
};
