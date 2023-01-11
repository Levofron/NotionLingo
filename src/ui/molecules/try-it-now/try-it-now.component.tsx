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
    <Box bg="white">
      <Container maxW="6xl" py={{ base: 14, sm: 20, md: 32 }}>
        <Card px={{ base: 4, md: 10 }} py={10} variant="dark">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Heading as="h3" mb={2}>
                Start using your Notion dictionary today
              </Heading>
              <Text color="gray.900" fontSize="lg">
                and expand your vocabulary, elevate your skills!
              </Text>
            </Box>
            <Flex align="center" justify="center" w="full">
              <Button
                isDisabled={isLoading}
                isLoading={isLoading}
                rightIcon={<IoArrowForward />}
                size="lg"
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
            </Flex>
          </SimpleGrid>
        </Card>
      </Container>
    </Box>
  );
};
