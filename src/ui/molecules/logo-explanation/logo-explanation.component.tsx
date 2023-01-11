import { FC } from 'react';

import { Box, Container, Flex, Heading, Highlight, Stack, Text } from '@ui/atoms';

import { STEPS } from './logo-explanation.defaults';

export const LogoExplanation: FC = (): JSX.Element => (
  <Box bg="gray.50">
    <Container maxW="3xl" py={{ base: 14, sm: 20, md: 32 }}>
      <Flex
        align={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 0, md: 10 }}
        justifyContent="center"
      >
        {STEPS.map((_step) => (
          <Stack
            key={_step.title}
            _first={{
              mt: 0,
            }}
            align={{ base: 'flex-start', md: 'center' }}
            maxW={{ base: 'full', md: 'xs' }}
            mt={{ base: 5, md: 0 }}
            textAlign={{ base: 'left', md: 'center' }}
          >
            <Heading color="gray.900" fontFamily="heading" fontSize="7xl">
              <Highlight query={_step.title}>{_step.title}</Highlight>
            </Heading>
            <Text color="gray.500">{_step.text}</Text>
          </Stack>
        ))}
      </Flex>
    </Container>
  </Box>
);
