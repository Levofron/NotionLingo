import { ForwardRefRenderFunction, forwardRef } from 'react';

import { Box, Card, Container, Flex, Heading, Stack, Text, TextUnderline } from '@ui/atoms';

import { STEPS } from './getting-started.defaults';

const GettingStartedComponent: ForwardRefRenderFunction<HTMLDivElement> = (_, ref): JSX.Element => (
  <Box ref={ref} bg="gray.900">
    <Container maxW="6xl" py={{ base: 14, sm: 20, md: 40 }}>
      <Heading
        as="h3"
        color="gray.50"
        fontSize={{ base: '3xl', sm: '4xl' }}
        mb={{ base: 14, sm: 20 }}
        textAlign="center"
      >
        Getting started in <TextUnderline mode="light">3 easy steps</TextUnderline>
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
            spacing={{ base: 4, sm: 6 }}
            textAlign={{ base: 'left', md: 'center' }}
          >
            <Card
              align="center"
              color="gray.50"
              fontSize="lg"
              fontWeight={700}
              height={{ base: 16, sm: 20 }}
              justify="center"
              mode="light"
              width={{ base: 16, sm: 20 }}
            >
              0{index + 1}
            </Card>
            <Flex flexDirection="column" gap={{ base: 2, sm: 3 }}>
              <Heading color="gray.50">{step.title}</Heading>
              <Text color="gray.300">{step.text}</Text>
            </Flex>
          </Stack>
        ))}
      </Flex>
    </Container>
  </Box>
);

export const GettingStarted = forwardRef(GettingStartedComponent);
