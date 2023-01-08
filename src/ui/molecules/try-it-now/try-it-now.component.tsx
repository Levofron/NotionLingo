import { FC } from 'react';
import { IoArrowForward } from 'react-icons/io5';

import { Box, Button, Card, Container, Flex, Heading, SimpleGrid, Text } from '@ui/atoms';

export const TryItNow: FC = (): JSX.Element => (
  <Box bg="white" borderBottom="1px solid" borderColor="black" borderTop="1px solid">
    <Container maxW="7xl" py={{ base: 14, sm: 20, md: 32 }}>
      <Box as={Card} color="black" px={{ base: 4, md: 10 }} py={10}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box>
            <Heading as="h3" mb={2}>
              Start using your Notion dictionary today
            </Heading>
            <Text fontSize="lg">and expand your vocabulary, elevate your skills!</Text>
          </Box>
          <Flex align="center" justify="center" w="full">
            <Button rightIcon={<IoArrowForward />} size="lg" variant="primary">
              Get Started
            </Button>
          </Flex>
        </SimpleGrid>
      </Box>
    </Container>
  </Box>
);
