import { FC } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';

import { Avatar, Button, Card, Container, Flex, Heading, Text } from '@presentation/atoms';
import { ConfirmationModal, ParticlesBackgroundLayout } from '@presentation/molecules';
import { SidebarWithHeader } from '@presentation/organisms';

import { IAccountSettingsProps } from './account-settings.types';

export const AccountSettings: FC<IAccountSettingsProps> = ({
  deleteAccountModalRef,
  deleteProfileCountdown,
  isDeleteProfileCountdownStarted,
  isDeleteProfileLoading,
  isResetIntegrationCountdownStarted,
  isResetIntegrationLoading,
  onDeleteProfile,
  onResetIntegration,
  resetIntegrationCountdown,
  resetIntegrationModalRef,
  shouldDisableActionButtons,
  user,
}) => (
  <>
    <SidebarWithHeader />
    <ParticlesBackgroundLayout height="100%">
      <ConfirmationModal
        ref={deleteAccountModalRef}
        description="Do you really want to delete you account? This action cannot be undone!"
        isConfirmLoading={isDeleteProfileLoading}
        onConfirm={onDeleteProfile}
      />
      <ConfirmationModal
        ref={resetIntegrationModalRef}
        description="Do you really want to reset you Notion integration?"
        isConfirmLoading={isResetIntegrationLoading}
        onConfirm={onResetIntegration}
      />
      <Container height="100%" maxW="6xl" position="relative" pt={{ base: 58, sm: 66, md: 74 }}>
        <Flex alignItems="center" height="100%" justifyContent="center">
          <Card
            alignItems="center"
            display="flex"
            minW={{ base: '300px', md: '350px' }}
            p={{ base: 4, sm: 6, md: 8 }}
          >
            <Avatar
              border="1px solid black"
              borderRadius={10}
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
              isDisabled={shouldDisableActionButtons}
              isLoading={isResetIntegrationLoading}
              leftIcon={<BiReset />}
              mb={2}
              onClick={() => resetIntegrationModalRef.current?.open()}
            >
              {`Reset Notion integration${
                isResetIntegrationCountdownStarted ? ` (${resetIntegrationCountdown})` : ''
              }`}
            </Button>
            <Button
              isDisabled={shouldDisableActionButtons}
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
  </>
);
