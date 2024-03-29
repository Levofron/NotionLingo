import Image from 'next/image';
import { FC, useCallback } from 'react';
import { AiTwotoneSound } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';

import { Box, Button, Card, Flex, Heading, Icon, Text } from '@presentation/atoms';

import { localStorageModule } from '@adapter/local-storage/local-storage.module';
import { speechSynthesisModule } from '@adapter/speech-synthesis/speech-synthesis.module';

import { useKeyPressMapper } from '@shared/hooks';

import { NotionWordCardFrontProps } from './notion-word-card-front.types';

const shouldEnableSpeechFeature =
  localStorageModule.isSupported() && speechSynthesisModule.isSupported();

const hasSuggestion = (original: string, suggestion?: string) =>
  !!suggestion && suggestion.length > 0 && suggestion !== original;

const handleSpeak = (phrase: string) => () =>
  shouldEnableSpeechFeature && speechSynthesisModule.speak(phrase);

export const NotionWordCardFront: FC<NotionWordCardFrontProps> = ({
  countdown,
  isCountdownEnded,
  isLoading,
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
  onApplySuggestions,
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

  useKeyPressMapper([[['KeyP', 'KeyS'], handleSpeak(word)]], !isTopCard);

  const cursor = shouldEnableSpeechFeature ? 'pointer' : 'default';
  const hasMeaningSuggestion = hasSuggestion(meaning, meaningSuggestion);
  const hasExampleSentenceSuggestion = hasSuggestion(exampleSentence, exampleSentenceSuggestion);

  return (
    <Card width={{ base: 300, sm: 350, md: 400 }}>
      {hasMeaningSuggestion || hasExampleSentenceSuggestion ? (
        <Button
          display={isTopCard ? 'flex' : 'none'}
          isLoading={isLoading}
          position="absolute"
          right={{ base: 0, sm: 3 }}
          size={{ base: 'xs', md: 'sm' }}
          top={{ base: '-40px', md: '-55px' }}
          onClick={onApplySuggestions}
        >
          Apply suggestions
        </Button>
      ) : null}
      <Box
        backgroundColor="gray.900"
        borderBottom="1px solid"
        borderColor="gray.900"
        borderRadius="9px 9px 0 0"
        height={{ base: '180px', sm: '205px', md: '240px' }}
        pointerEvents="none"
        position="relative"
      >
        <Image
          fill
          alt={`Image representing '${word}' word`}
          src={imageUrl}
          style={{ filter: 'grayscale(100%)', borderRadius: '9px 9px 0 0' }}
        />
      </Box>
      <Flex flexDirection="column" gap={1} p={{ base: 2, sm: 3, md: 4 }}>
        {hasType ? (
          <Flex gap={2} mb={{ base: 0, sm: 1, md: 2 }}>
            {renderTypes()}
          </Flex>
        ) : null}
        <Flex flexDirection="column">
          {shouldEnableSpeechFeature ? (
            <Flex cursor="pointer" gap={1} width="fit-content" onClick={handleSpeak(word)}>
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
          <Text
            border="1px solid"
            borderColor="gray.900"
            borderRadius={10}
            color="gray.900"
            cursor={cursor}
            fontSize={{ base: 'sm', sm: 'md' }}
            noOfLines={{ base: 4, md: 5 }}
            p={{ base: 1, sm: 2 }}
            onClick={handleSpeak(meaningSuggestion!)}
          >
            {meaningSuggestion}
          </Text>
        ) : (
          <Text
            color="gray.500"
            cursor={cursor}
            fontSize={{ base: 'sm', sm: 'md' }}
            noOfLines={{ base: 4, md: 5 }}
            onClick={handleSpeak(meaning)}
          >
            {meaning}
          </Text>
        )}
      </Flex>
      <Flex borderTop="1px solid" borderTopColor="gray.900" justifyContent="space-between">
        <Flex gap={1} width="fit-content">
          {hasExampleSentenceSuggestion ? (
            <Flex
              flexDirection="column"
              p={{ base: 2, sm: 3, md: 4 }}
              position="relative"
              width="full"
            >
              <Text
                border="1px solid"
                borderColor="gray.900"
                borderRadius={10}
                color="gray.900"
                cursor={cursor}
                fontSize={{ base: 'sm', sm: 'md' }}
                noOfLines={{ base: 4, md: 5 }}
                p={{ base: 1, sm: 2 }}
                onClick={handleSpeak(exampleSentenceSuggestion!)}
              >
                {exampleSentenceSuggestion}
              </Text>
            </Flex>
          ) : (
            <Text
              color="gray.900"
              cursor={cursor}
              fontSize={{ base: 'sm', sm: 'md' }}
              noOfLines={{ base: 4, md: 5 }}
              p={{ base: 2, sm: 3, md: 4 }}
              onClick={handleSpeak(exampleSentence!)}
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
          borderLeft="1px solid"
          borderTopColor="gray.900"
          cursor="pointer"
          justifyContent="center"
          maxWidth="120px"
          minHeight="50px"
          minWidth="100px"
          transition="all .3s ease"
          onClick={onClick}
        >
          {isCountdownEnded ? <CiHeart fontSize="40px" /> : <Text fontSize="xl">{countdown}</Text>}
        </Flex>
      </Flex>
    </Card>
  );
};
