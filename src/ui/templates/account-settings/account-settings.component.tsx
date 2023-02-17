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
import { useAxiosAction, useCountdown, useToast, useUser } from '@infrastructure/utils';

export const AccountSettingsTemplate = (): JSX.Element => {
  const toast = useToast();
  const router = useRouter();

  const { logout, resetNotionData, user } = useUser();
  const {
    countdown: resetNotionIntegrationCountdown,
    end: endResetNotionIntegrationCountdown,
    isStarted: isResetNotionIntegrationCountdownStarted,
    start: startResetNotionIntegrationCountdown,
  } = useCountdown(5);
  const {
    countdown: deleteProfileCountdown,
    end: endDeleteProfileCountdown,
    isStarted: isDeleteProfileCountdownStarted,
    start: startDeleteProfileCountdown,
  } = useCountdown(5);

  const deleteAccountModalRef = useRef<IConfirmationModalRef>(null);
  const resetIntegrationModalRef = useRef<IConfirmationModalRef>(null);

  const {
    loading: isResetNotionIntegrationLoading,
    mutateAsync: mutateAsyncResetNotionIntegration,
  } = useAxiosAction(restModule.resetNotionIntegration);

  const { loading: isDeleteProfileLoading, mutateAsync: mutateAsyncDeleteProfile } = useAxiosAction(
    restModule.deleteProfile,
  );

  const handleConfirmResetNotionIntegration = () =>
    mutateAsyncResetNotionIntegration()
      .then(() => {
        startResetNotionIntegrationCountdown();

        setTimeout(() => {
          toast.success({
            description: 'Notion integration has been reset!',
            onCloseComplete: () => {
              resetNotionData();
              router.push(ERoutes.ONBOARDING);
              endResetNotionIntegrationCountdown();
            },
          });
        });
      })
      .catch((_error) =>
        toast.error({
          description: _error,
        }),
      )
      .finally(resetIntegrationModalRef.current?.close);

  const handleConfirmDeleteProfile = () =>
    mutateAsyncDeleteProfile()
      .then(() => {
        startDeleteProfileCountdown();

        setTimeout(() => {
          toast.success({
            description: 'Account has been deleted!',
            onCloseComplete: () => {
              logout();
              resetNotionData();
              endDeleteProfileCountdown();
            },
          });
        }, 0);
      })
      .catch((_error) =>
        toast.error({
          description: _error,
        }),
      )
      .finally(deleteAccountModalRef.current?.close);

  return (
    <Box bg="gray.50" height="100%" overflow="hidden">
      <ParticlesBackground />
      <ConfirmationModal
        ref={deleteAccountModalRef}
        description="Do you really want to delete you account? This action cannot be undone!"
        isConfirmLoading={isDeleteProfileLoading}
        onConfirm={handleConfirmDeleteProfile}
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
            <Heading fontSize="2xl">{user?.fullName}</Heading>
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
              disabled={isDeleteProfileCountdownStarted || isResetNotionIntegrationCountdownStarted}
              isLoading={isResetNotionIntegrationLoading}
              leftIcon={<BiReset />}
              mb={2}
              size={{ base: 'sm', sm: 'md' }}
              onClick={() => resetIntegrationModalRef.current?.open()}
            >
              {`Reset Notion integration${
                isResetNotionIntegrationCountdownStarted
                  ? ` (${resetNotionIntegrationCountdown})`
                  : ''
              }`}
            </Button>
            <Button
              disabled={isDeleteProfileCountdownStarted || isResetNotionIntegrationCountdownStarted}
              isLoading={isDeleteProfileLoading}
              leftIcon={<AiFillDelete />}
              size={{ base: 'sm', sm: 'md' }}
              onClick={() => deleteAccountModalRef.current?.open()}
            >
              {`Delete Account${
                isDeleteProfileCountdownStarted ? ` (${deleteProfileCountdown})` : ''
              }`}
            </Button>
          </Card>
        </Flex>
      </Container>
    </Box>
  );
};
