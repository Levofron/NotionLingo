import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { IoArrowForward } from 'react-icons/io5';

import { Box, Button, Card, Container, Flex, Heading, SimpleGrid, Text } from '@ui/atoms';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

export const TryItNow: FC = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, loginViaGoogle, user } = useUser();

  const handleActionButtonClick = () => {
    if (!user) {
      return loginViaGoogle();
    }

    router.push(user.hasNotionData === true ? ERoutes.DASHBOARD : ERoutes.ONBOARDING);
  };

  const buttonLabel = useMemo(() => {
    if (!user) {
      return 'Create an account';
    }

    return user.hasNotionData === true ? 'Go to dashboard' : 'Get started';
  }, [user]);

  return (
    <Box bg="white">
      <Container maxW="6xl" py={{ base: 14, sm: 20, md: 32 }}>
        <Card bg="white" px={{ base: 4, md: 10 }} py={10}>
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
                onClick={handleActionButtonClick}
              >
                {buttonLabel}
              </Button>
            </Flex>
          </SimpleGrid>
        </Card>
      </Container>
    </Box>
  );
};
