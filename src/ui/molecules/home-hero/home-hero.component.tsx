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
  Text,
} from '@ui/atoms';

import { ERoutes } from '@infrastructure/types/routes';
import { useUser } from '@infrastructure/utils';

export const HomeHero: FC = (): JSX.Element => {
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
    <Box bg="gray.50" position="relative">
      <ParticlesBackground />
      <Container maxW="3xl" pt={{ base: 66, md: 74 }}>
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
          <Text color="gray.900" fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}>
            Elevate your vocabulary with our cutting-edge app! Our intuitive platform allows you to
            easily learn new words and phrases from your own <b>Notion</b> database!
          </Text>
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            size={{ base: 'sm', sm: 'md', md: 'lg' }}
            variant="primary"
            width="fit-content"
            onClick={handleActionButtonClick}
          >
            {buttonLabel}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};
