import { FC, useMemo } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from '@presentation/atoms';

import { useRouter, useUser } from '@shared/hooks';

export const TryItNow: FC = (): JSX.Element => {
  const { isLoading, user } = useUser();
  const { redirectToDashboard, redirectToLogin, redirectToOnboarding } = useRouter();

  const handleActionButtonClick = () => {
    if (!user) {
      return redirectToLogin();
    }

    if (user.hasNotionData === true) {
      return redirectToDashboard();
    }

    redirectToOnboarding();
  };

  const buttonLabel = useMemo(() => {
    if (!user) {
      return 'Create an account';
    }

    return user.hasNotionData === true ? 'Go to dashboard' : 'Get started';
  }, [user]);

  return (
    <Box bg="white">
      <Container maxW="6xl" py={{ base: 14, sm: 20, md: 40 }}>
        <Card bg="white" p={{ base: 4, md: 10 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Heading as="h3" fontSize={{ base: '3xl', sm: '4xl' }} mb={2}>
                Start using your Notion dictionary today
              </Heading>
              <Text color="gray.900">and expand your vocabulary, elevate your skills!</Text>
            </Box>
            <Flex align="center" justify="center" w="full">
              <Button
                isLoading={isLoading}
                rightIcon={<Icon as={FaChevronRight} fontSize={{ base: 11, sm: 13, md: 14 }} />}
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
