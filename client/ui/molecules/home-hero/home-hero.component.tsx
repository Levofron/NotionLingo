import { useMediaQuery } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useRef } from 'react';

import { Button, Container, Flex, Heading, Highlight } from '@ui/atoms';

import { useRouter, useUser } from '@infrastructure/hooks';
import { ERoutes } from '@infrastructure/routes';

import { ParticlesBackgroundLayout } from '..';
import { IHomeHeroProps } from './home-hero.types';

export const HomeHero: FC<IHomeHeroProps> = ({ gettingStartedRef }): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { push, redirectToLogin } = useRouter();
  const { isLoading, user } = useUser();
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handleActionButtonClick = () => {
    if (!user) {
      return redirectToLogin();
    }

    push(user.hasNotionData === true ? ERoutes.DASHBOARD : ERoutes.ONBOARDING);
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
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            style={{
              objectFit: 'cover',
              border: '1px solid',
              zIndex: 1,
              minWidth: 740,
              minHeight: 418,
              borderRadius: 10,
              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
              display: isSmallerThan800 ? 'none' : 'block',
            }}
          >
            <source src="presentation.mp4" type="video/mp4" />
          </video>
        </Flex>
      </Container>
    </ParticlesBackgroundLayout>
  );
};
