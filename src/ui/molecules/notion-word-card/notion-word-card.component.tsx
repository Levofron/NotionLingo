import Image from 'next/image';
import { FC, useCallback } from 'react';
import { AiTwotoneSound } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';

import { speechSynthesisModule } from '@adapter';

import { Box, Card, Flex, Heading, Text } from '@ui/atoms';

import { INotionWordCardProps } from './notion-word-card.types';

export const NotionWordCard: FC<INotionWordCardProps> = ({
  exampleSentence,
  ipa,
  meaning,
  onClick,
  type,
  word,
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
    speechSynthesisModule.cancel();
    speechSynthesisModule.speak({ text: word });
  }, []);

  return (
    <Card w={{ base: 300, sm: 350, md: 400 }}>
      <Box
        borderBottom="2px solid"
        borderColor="gray.900"
        h={{ base: '180px', sm: '205px', md: '240px' }}
        pointerEvents="none"
        position="relative"
      >
        <Image
          fill
          alt="Learning image"
          src="https://images.pexels.com/photos/247819/pexels-photo-247819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </Box>
      <Flex flexDirection="column" gap={1} p={{ base: 2, sm: 3, md: 4 }}>
        {hasType ? (
          <Flex gap={2} mb={{ base: 0, sm: 1, md: 2 }}>
            {renderTypes()}
          </Flex>
        ) : null}
        <Flex flexDirection="column">
          {speechSynthesisModule.isSupported() ? (
            <Flex alignItems="center" cursor="pointer" gap={1} onClick={handleSpeak}>
              <AiTwotoneSound fontSize="20px" />
              <Heading color="gray.900" fontSize="2xl">
                {word}
              </Heading>
            </Flex>
          ) : null}
          {ipa ? (
            <Text color="gray.500" fontSize="xs">
              {ipa}
            </Text>
          ) : null}
        </Flex>
        <Text color="gray.500">{meaning}</Text>
      </Flex>
      <Flex borderTop="2px solid" borderTopColor="gray.900" justifyContent="space-between">
        <Text color="gray.900" p={{ base: 2, sm: 3, md: 4 }}>
          &quot;{exampleSentence}&quot;
        </Text>
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
          minWidth="100px"
          transition="all .3s ease"
          onClick={onClick}
        >
          <BsHeart fontSize="40px" />
        </Flex>
      </Flex>
    </Card>
  );
};