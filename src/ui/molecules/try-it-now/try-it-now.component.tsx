import { FC } from 'react';
import { IoArrowForward } from 'react-icons/io5';

import { Box, Button, ChakraNextLink, Container, Flex, Heading, SimpleGrid, Text } from '@ui/atoms';

import { ERoutes } from '@infrastructure/types/routes';

export const TryItNow: FC = (): JSX.Element => (
  <Box bg="red.50">
    <Container maxW="7xl" py={{ base: 14, sm: 20, md: 32 }}>
      <Box bg="red.400" color="white" px={{ base: 4, md: 10 }} py={10} rounded="xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box>
            <Heading as="h3" mb={2}>
              Start using your Notion dictionary today
            </Heading>
            <Text fontSize="lg">and expand your vocabulary, elevate your skills!</Text>
          </Box>
          <Flex align="center" justify="center" w="full">
            <ChakraNextLink passHref href={ERoutes.ONBOARDING}>
              <Button
                _hover={{
                  bg: 'red.700',
                }}
                bg="red.600"
                fontSize="md"
                px={8}
                rightIcon={<IoArrowForward />}
                rounded="full"
                size="lg"
              >
                Get Started
              </Button>
            </ChakraNextLink>
          </Flex>
        </SimpleGrid>
      </Box>
    </Container>
  </Box>
);
