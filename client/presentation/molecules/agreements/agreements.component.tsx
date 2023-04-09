import { FC } from 'react';

import { Box, Container, Flex, Heading, Text } from '@presentation/atoms';

import { IAgreementsProps } from './agreements.types';

export const Agreements: FC<IAgreementsProps> = ({ agreements, heading }): JSX.Element => (
  <Box bg="gray.50">
    <Container maxW="3xl" pt={{ base: 58, sm: 66, md: 74 }}>
      <Flex
        alignItems="center"
        flexDirection="column"
        gap={{ base: 8, md: 14 }}
        maxW="3xl"
        py={{ base: 14, sm: 20 }}
      >
        <Heading
          color="gray.900"
          fontSize={{
            base: '4xl',
            md: '5xl',
          }}
          textAlign="center"
        >
          {heading}
        </Heading>
        <Flex flexDirection="column" gap={{ base: 5, sm: 6, md: 8 }}>
          {agreements.map(({ content, title }) => (
            <Flex key={content} flexDirection="column" gap={{ base: 1, sm: 2, md: 4 }}>
              {title ? (
                <Heading color="gray.900" textAlign="left">
                  {title}
                </Heading>
              ) : null}
              <Text withBalancer fontWeight={title ? 'light' : 'bold'}>
                {content}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Container>
  </Box>
);
