import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

import { Button, Container, Flex, Heading, Highlight, Stack, Text } from '@ui/atoms';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

import { ParticlesBackgroundLayout } from '..';
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
    <ParticlesBackgroundLayout>
      <Container maxW="3xl" pt={{ base: 58, sm: 66, md: 74 }}>
        <Flex
          alignItems="center"
          flexDirection="column"
          gap={{ base: 8, md: 14 }}
          maxW="3xl"
          py={{ base: 20, md: 36 }}
          textAlign="center"
        >
          <Heading
            color="gray.900"
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            fontWeight={800}
          >
            <Highlight query={['expand']}>
              Expand vocabulary with your own Notion database!
            </Highlight>
          </Heading>
          <Text color="gray.900" display={{ base: 'none', sm: 'block' }} maxW="60%">
            Our intuitive platform allows you to easily learn new words and phrases from your own{' '}
            <b>Notion</b> database!
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
    </ParticlesBackgroundLayout>
  );
};
