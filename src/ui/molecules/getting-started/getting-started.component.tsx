import { FC } from 'react';

import { Box, Container, Flex, Heading, Stack, Text, TextUnderline } from '@ui/atoms';

import { STEPS } from './getting-started.defaults';

export const GettingStarted: FC = (): JSX.Element => (
  <Box bg="gray.50">
    <Container maxW="7xl" py={{ base: 14, sm: 20, md: 32 }}>
      <Heading as="h3" mb={{ base: 14, sm: 16 }} textAlign="center">
        Getting started in <TextUnderline>3 easy steps</TextUnderline>
      </Heading>
      <Flex
        align={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
      >
        {STEPS.map((step, index) => (
          <Stack
            key={step.title}
            _first={{
              mt: 0,
            }}
            align={{ base: 'flex-start', md: 'center' }}
            maxW={{ base: 'full', md: 'xs' }}
            mt={{ base: 10, md: 0 }}
            px={4}
            spacing={4}
            textAlign={{ base: 'left', md: 'center' }}
          >
            <Flex
              align="center"
              bg="red.100"
              color="red.700"
              fontSize="sm"
              fontWeight={700}
              h={10}
              justify="center"
              rounded="md"
              w={10}
            >
              0{index + 1}
            </Flex>
            <Heading color="gray.700" fontFamily="heading" fontSize="xl">
              {step.title}
            </Heading>
            <Text color="gray.500">{step.text}</Text>
          </Stack>
        ))}
      </Flex>
    </Container>
  </Box>
);
