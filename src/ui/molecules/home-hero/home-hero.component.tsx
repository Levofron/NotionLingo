import { FC } from 'react';

import { Box, Button, Container, Heading, Highlight, Stack, Text } from '@ui/atoms';

import { CONFETTI_LIGHT } from '@constants';

export const HomeHero: FC = (): JSX.Element => (
  <Box
    bg="gray.100"
    css={{
      backgroundAttachment: 'fixed',
      backgroundImage: CONFETTI_LIGHT,
    }}
  >
    <Container maxW="3xl">
      <Stack as={Box} py={{ base: 20, md: 36 }} spacing={{ base: 8, md: 14 }} textAlign="center">
        <Heading
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          fontWeight={800}
          lineHeight="120%"
        >
          <Highlight
            query={['expand', 'skills']}
            styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.400' }}
          >
            Expand your vocabulary, elevate your skills
          </Highlight>
        </Heading>
        <Text color="gray.500">
          Elevate your vocabulary with our cutting-edge app! Our intuitive platform allows you to
          easily learn new words and phrases from your own <b>Notion</b> database!
        </Text>
        <Stack align="center" alignSelf="center" direction="column" position="relative" spacing={3}>
          <Button
            _hover={{
              bg: 'red.500',
            }}
            bg="red.400"
            px={6}
            rounded="full"
          >
            Get Started
          </Button>
          <Button colorScheme="blue" size="sm" variant="link">
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Container>
  </Box>
);
