import Image from 'next/image';
import { FC } from 'react';
import { BsHeart } from 'react-icons/bs';

import { Box, Card, Flex, Heading, Text } from '@ui/atoms';

import { INotionWordCardProps } from './notion-word-card.types';

// TODO - add text reader
export const NotionWordCard: FC<INotionWordCardProps> = ({
  exampleSentence,
  meaning,
  word,
}): JSX.Element => (
  <Card w={{ base: 300, sm: 350, md: 400 }}>
    <Box
      borderBottom="2px"
      borderColor="gray.900"
      h={{ base: '180px', sm: '205px', md: '240px' }}
      position="relative"
    >
      <Image
        fill
        alt="Learning image"
        src="https://images.pexels.com/photos/247819/pexels-photo-247819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
    </Box>
    <Flex flexDirection="column" gap={1} p={{ base: 2, sm: 3, md: 4 }}>
      <Heading color="black" fontSize="2xl">
        {word}
      </Heading>
      <Text color="gray.500">{meaning}</Text>
    </Flex>
    <Flex borderTop="2px solid" borderTopColor="gray.900">
      <Text color="gray.900" p={{ base: 2, sm: 3, md: 4 }}>
        &quot;{exampleSentence}&quot;
      </Text>
      <Flex
        alignItems="center"
        borderLeft="2px solid"
        borderTopColor="gray.900"
        justifyContent="center"
        width="-webkit-fill-available"
      >
        <BsHeart fontSize="40px" />
      </Flex>
    </Flex>
  </Card>
);
