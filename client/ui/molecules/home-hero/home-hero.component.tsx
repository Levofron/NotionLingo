import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Highlight,
  ParticlesBackground,
  Stack,
  Text,
} from '@ui/atoms';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

import { IHomeHeroProps } from './home-hero.types';

export const HomeHero: FC<IHomeHeroProps> = ({ gettingStartedRef }): JSX.Element => {
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

  const handleLearnMoreClick = () => {
    if (gettingStartedRef?.current) {
      gettingStartedRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box bg="gray.50" position="relative">
      <ParticlesBackground />
      <Container maxW="3xl" pt={{ base: 58, sm: 66, md: 74 }}>
        <Flex
          alignItems="center"
          flexDirection="column"
          gap={{ base: 8, md: 14 }}
          maxW="3xl"
          py={{ base: 10, sm: 20, md: 36 }}
          textAlign="center"
        >
          <Heading
            color="gray.900"
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            fontWeight={800}
            lineHeight="120%"
          >
            <Highlight query={['expand', 'skills']}>
              Expand your vocabulary, elevate your skills
            </Highlight>
          </Heading>
          <Text color="gray.900">
            Elevate your vocabulary with our cutting-edge app! Our intuitive platform allows you to
            easily learn new words and phrases from your own <b>Notion</b> database!
          </Text>
          <Stack
            align="center"
            alignSelf="center"
            direction="column"
            position="relative"
            spacing={{ base: 2, sm: 3 }}
          >
            <Button
              isDisabled={isLoading}
              isLoading={isLoading}
              width="fit-content"
              onClick={handleActionButtonClick}
            >
              {buttonLabel}
            </Button>
            <Text cursor="pointer" onClick={handleLearnMoreClick}>
              Learn more
            </Text>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};