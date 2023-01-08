import { useRouter } from 'next/router';
import { FC } from 'react';

import { Box, Button, Container, Flex, Heading, Highlight, Text } from '@ui/atoms';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

export const HomeHero: FC = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const handleGetStartedClick = () =>
    router.push(user?.hasNotionData === true ? ERoutes.DASHBOARD : ERoutes.ONBOARDING);

  return (
    <Box bg="white" borderBottom="20px solid" borderColor="black" pt={65}>
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
              styles={{ px: '2', py: '1', bg: 'white', border: '2px solid' }}
            >
              Expand your vocabulary, elevate your skills
            </Highlight>
          </Heading>
          <Text color="gray.500">
            Elevate your vocabulary with our cutting-edge app! Our intuitive platform allows you to
            easily learn new words and phrases from your own <b>Notion</b> database!
          </Text>
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            size="lg"
            variant="primary"
            width="fit-content"
            onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};
