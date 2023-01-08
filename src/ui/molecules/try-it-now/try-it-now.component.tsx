import { useRouter } from 'next/router';
import { FC } from 'react';
import { IoArrowForward } from 'react-icons/io5';

import { Box, Button, Card, Container, Flex, Heading, SimpleGrid, Text } from '@ui/atoms';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

export const TryItNow: FC = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const handleGetStartedClick = () =>
    router.push(user?.hasNotionData === true ? ERoutes.DASHBOARD : ERoutes.ONBOARDING);

  return (
    <Box bg="white" borderBottom="10px solid" borderColor="black" borderTop="15px solid">
      <Container maxW="6xl" py={{ base: 14, sm: 20, md: 32 }}>
        <Box as={Card} color="black" px={{ base: 4, md: 10 }} py={10}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Heading as="h3" mb={2}>
                Start using your Notion dictionary today
              </Heading>
              <Text fontSize="lg">and expand your vocabulary, elevate your skills!</Text>
            </Box>
            <Flex align="center" justify="center" w="full">
              <Button
                isDisabled={isLoading}
                isLoading={isLoading}
                rightIcon={<IoArrowForward />}
                size="lg"
                variant="primary"
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
            </Flex>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};
