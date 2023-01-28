import { useRef } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';

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

import { useUser } from '@infrastructure/utils';

export const AccountSettingsTemplate = (): JSX.Element => {
  const { user } = useUser();
  const deleteAccountModalRef = useRef<IConfirmationModalRef>(null);
  const resetIntegrationModalRef = useRef<IConfirmationModalRef>(null);

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
        onConfirm={resetIntegrationModalRef.current?.close}
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
              leftIcon={<BiReset />}
              mb={2}
              size={{ base: 'sm', sm: 'md' }}
              onClick={resetIntegrationModalRef.current?.open}
            >
              Reset Notion integration
            </Button>
            <Button
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
