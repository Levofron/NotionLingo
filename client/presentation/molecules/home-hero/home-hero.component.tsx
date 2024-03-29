import NextImage from 'next/image';
import { FC, useMemo } from 'react';

import { Box, Button, Card, Container, Flex, Heading, Highlight } from '@presentation/atoms';

import { useRouter, useUser } from '@shared/hooks';
import { Routes } from '@shared/routes';

import { ParticlesBackgroundLayout } from '../particles-background-layout/particles-background-layout.component';
import { HomeHeroProps } from './home-hero.types';

export const HomeHero: FC<HomeHeroProps> = ({ gettingStartedRef }): JSX.Element => {
  const { isLoading, user } = useUser();
  const { push, redirectToLogin } = useRouter();

  const handleActionButtonClick = () => {
    if (!user) {
      return redirectToLogin();
    }

    push(user.hasNotionData === true ? Routes.DASHBOARD : Routes.ONBOARDING);
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
          <Flex
            align="center"
            alignSelf="center"
            direction={{ base: 'column', sm: 'row' }}
            flex={{ base: '135 135', sm: '160 160', md: '190 190' }}
            gap={{ base: 2, sm: 3 }}
          >
            <Button
              isDisabled={isLoading}
              isLoading={isLoading}
              width="100%"
              onClick={handleActionButtonClick}
            >
              {buttonLabel}
            </Button>
            <Button mode="light" width="100%" onClick={handleLearnMoreClick}>
              Learn more
            </Button>
          </Flex>
          <Card display={{ base: 'none', sm: 'block' }} mt={5} overflow="hidden">
            <NextImage
              alt="Dashboard placeholder"
              height={418}
              src="/presentation-placeholder.jpg"
              width={740}
            />
            <Box
              // @ts-expect-error
              autoPlay
              loop
              muted
              playsInline
              as="video"
              display={{ base: 'none', sm: 'block' }}
              height="100%"
              left={0}
              objectFit="contain"
              position="absolute"
              top={0}
              zIndex={1}
            >
              <source src="presentation.mp4" type="video/mp4" />
            </Box>
          </Card>
        </Flex>
      </Container>
    </ParticlesBackgroundLayout>
  );
};
