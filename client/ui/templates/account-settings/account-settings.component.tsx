import { useRef } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';

import { Avatar, Button, Card, Container, Flex, Heading, Text } from '@ui/atoms';
import { ConfirmationModal, IConfirmationModalRef, ParticlesBackgroundLayout } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { useAxios, useCountdown, useRouter, useToast, useUser } from '@infrastructure/utils';

export const AccountSettingsTemplate = (): JSX.Element => {
  const toast = useToast();
  const { redirectToOnboarding } = useRouter();

  const { logout, setNotionData, user } = useUser();
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
    isLoading: isResetNotionIntegrationLoading,
    mutateAsync: mutateAsyncResetNotionIntegration,
  } = useAxios(restModule.resetNotionIntegration);

  const { isLoading: isDeleteProfileLoading, mutateAsync: mutateAsyncDeleteProfile } = useAxios(
    restModule.deleteProfile,
  );

  const handleConfirmResetNotionIntegration = () =>
    mutateAsyncResetNotionIntegration()
      .then(() => {
        startResetNotionIntegrationCountdown();

        setTimeout(() =>
          toast.success({
            description: 'Notion integration has been reset!',
            onCloseComplete: () => {
              setNotionData(false);
              redirectToOnboarding();
              endResetNotionIntegrationCountdown();
            },
          }),
        );
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
              setNotionData(false);
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

  const isDisabledButton =
    isDeleteProfileCountdownStarted ||
    isResetNotionIntegrationCountdownStarted ||
    !user?.hasNotionData;

  return (
    <ParticlesBackgroundLayout height="100%">
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
      <Container height="100%" maxW="6xl" position="relative" pt={{ base: 58, sm: 66, md: 74 }}>
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
            <Text color="gray.900" mb={4}>
              {user?.email}
            </Text>
            <Text color="gray.900">
              Days in streak: <b>{user?.daysInStreak}</b>
            </Text>
            <Text color="gray.900" mb={{ base: 5, sm: 8 }}>
              Total learned words: <b>{user?.totalLearnedWords}</b>
              {user?.totalLearnedWords ? '!' : ''}
            </Text>
            <Button
              isDisabled={isDisabledButton}
              isLoading={isResetNotionIntegrationLoading}
              leftIcon={<BiReset />}
              mb={2}
              onClick={() => resetIntegrationModalRef.current?.open()}
            >
              {`Reset Notion integration${
                isResetNotionIntegrationCountdownStarted
                  ? ` (${resetNotionIntegrationCountdown})`
                  : ''
              }`}
            </Button>
            <Button
              isDisabled={isDisabledButton}
              isLoading={isDeleteProfileLoading}
              leftIcon={<AiFillDelete />}
              onClick={() => deleteAccountModalRef.current?.open()}
            >
              {`Delete Account${
                isDeleteProfileCountdownStarted ? ` (${deleteProfileCountdown})` : ''
              }`}
            </Button>
          </Card>
        </Flex>
      </Container>
    </ParticlesBackgroundLayout>
  );
};
