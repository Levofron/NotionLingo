import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';

import { restModule } from '@adapter';

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  ParticlesBackground,
  Text,
} from '@ui/atoms';
import { ConfirmationModal, IConfirmationModalRef } from '@ui/molecules';

import { ERoutes } from '@infrastructure/types/routes';
import { useAxiosAction, useCountdown, useUser } from '@infrastructure/utils';

export const AccountSettingsTemplate = (): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const { resetNotionData, user } = useUser();
  const { countdown, end: endCountdown, isStarted, start: startCountdown } = useCountdown(3);
  const deleteAccountModalRef = useRef<IConfirmationModalRef>(null);
  const resetIntegrationModalRef = useRef<IConfirmationModalRef>(null);

  const {
    loading: isResetNotionIntegrationLoading,
    mutateAsync: mutateAsyncResetNotionIntegration,
  } = useAxiosAction(restModule.resetNotionIntegration);

  const handleConfirmResetNotionIntegration = () =>
    mutateAsyncResetNotionIntegration()
      .then(() => {
        startCountdown();
        resetNotionData();

        setTimeout(() => {
          toast({
            duration: 3000,
            status: 'success',
            title: 'Success!',
            description: 'Notion integration has been reset!',
            onCloseComplete: () => {
              endCountdown();
              router.push(ERoutes.ONBOARDING);
            },
          });
        });
      })
      .catch((_error) =>
        toast({
          duration: 3000,
          status: 'error',
          title: 'Error!',
          description: _error,
        }),
      )
      .finally(resetIntegrationModalRef.current?.close);

  return (
    <Box bg="gray.50" height="100%" overflow="hidden">
      <ParticlesBackground />
      <ConfirmationModal
        ref={deleteAccountModalRef}
        description="Do you really want to delete you account? This action cannot be undone!"
        onConfirm={deleteAccountModalRef.current?.close}
      />
      <ConfirmationModal
        ref={resetIntegrationModalRef}
        description="Do you really want to reset you Notion integration?"
        isConfirmLoading={isResetNotionIntegrationLoading}
        onConfirm={handleConfirmResetNotionIntegration}
      />
      <Container height="100%" maxW="6xl" position="relative" pt={{ base: 66, md: 74 }}>
        <Flex alignItems="center" height="100%" justifyContent="center">
          <Card alignItems="center" display="flex" p={{ base: 2, sm: 3, md: 4 }}>
            <Avatar
              border="2px solid black"
              borderRadius={0}
              mb={4}
              pos="relative"
              size="xl"
              src={user?.avatarUrl}
            />
            <Heading fontFamily="body" fontSize="2xl">
              {user?.fullName}
            </Heading>
            <Text color="gray.900" fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} mb={4}>
              {user?.email}
            </Text>
            <Text color="gray.900" fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}>
              Days in streak: <b>{user?.daysInStreak}</b>
            </Text>
            <Text
              color="gray.900"
              fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
              mb={{ base: 5, sm: 8 }}
            >
              Total learned words: <b>{user?.totalLearnedWords}</b>
              {user?.totalLearnedWords ? '!' : ''}
            </Text>
            <Button
              disabled={isStarted}
              isLoading={isResetNotionIntegrationLoading}
              leftIcon={<BiReset />}
              mb={2}
              size={{ base: 'sm', sm: 'md' }}
              onClick={resetIntegrationModalRef.current?.open}
            >
              {`Reset Notion integration${isStarted ? ` (${countdown})` : ''}`}
            </Button>
            <Button
              disabled={isResetNotionIntegrationLoading}
              leftIcon={<AiFillDelete />}
              size={{ base: 'sm', sm: 'md' }}
              onClick={deleteAccountModalRef.current?.open}
            >
              Delete Account
            </Button>
          </Card>
        </Flex>
      </Container>
    </Box>
  );
};
