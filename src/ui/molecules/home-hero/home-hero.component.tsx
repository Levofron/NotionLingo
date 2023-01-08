import { FC } from 'react';

import { Box, Button, Container, Flex, Heading, Highlight, Text } from '@ui/atoms';

export const HomeHero: FC = (): JSX.Element => (
  <Box bg="white" borderBottom="1px solid" borderColor="black" borderTop="1px solid" pt={65}>
    <Container maxW="3xl">
      <Flex
        alignItems="center"
        flexDirection="column"
        gap={{ base: 8, md: 14 }}
        maxW="3xl"
        py={{ base: 20, md: 36 }}
        textAlign="center"
      >
        <Heading
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          fontWeight={800}
          lineHeight="120%"
        >
          <Highlight
            query={['expand', 'skills']}
            styles={{ px: '2', py: '1', bg: 'white', border: '1px solid' }}
          >
            Expand your vocabulary, elevate your skills
          </Highlight>
        </Heading>
        <Text color="gray.500">
          Elevate your vocabulary with our cutting-edge app! Our intuitive platform allows you to
          easily learn new words and phrases from your own <b>Notion</b> database!
        </Text>
        <Button size="lg" variant="primary" width="fit-content">
          Get Started
        </Button>
      </Flex>
    </Container>
  </Box>
);
