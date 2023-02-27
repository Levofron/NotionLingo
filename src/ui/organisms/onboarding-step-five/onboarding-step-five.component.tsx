import { FC, useEffect } from 'react';

import { Button, Flex, Spinner, TabPanel, Text } from '@ui/atoms';
import { AvailableNotionDatabase } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { useAxios, useRouter, useToast } from '@infrastructure/utils';

import { IOnboardingStepFiveProps } from './onboarding-step-five.types';

export const OnboardingStepFive: FC<IOnboardingStepFiveProps> = ({
  onBackToFirstStepClick,
}): JSX.Element => {
  const {
    data: availableNotionDatabasesData,
    isLoading: isAvailableNotionDatabasesLoading,
    mutate: mutateAvailableNotionDatabases,
  } = useAxios(restModule.getAvailableNotionDatabases);

  const { isLoading: isSetNotionDatabaseIdLoading, mutateAsync: mutateAsyncSetNotionDatabaseId } =
    useAxios(restModule.setNotionDatabaseId);

  const toast = useToast();
  const { redirectToDashboard } = useRouter();

  useEffect(mutateAvailableNotionDatabases, []);

  const handleAvailableNotionDatabaseClick = async (databaseId: string) => {
    mutateAsyncSetNotionDatabaseId(databaseId)
      .then(() =>
        toast.success({
          onCloseComplete: redirectToDashboard,
          description: 'You have successfully connected your Notion page!',
        }),
      )
      .catch((_error) =>
        toast.error({
          description: _error,
        }),
      );
  };

  const renderAvailableNotionDatabases = () => {
    if (isAvailableNotionDatabasesLoading) {
      return <Spinner size="lg" />;
    }

    if (!availableNotionDatabasesData?.length) {
      return (
        <Flex alignItems="center" flexDirection="column">
          <Text withBalancer color="red.400" fontSize="sm" fontWeight="normal" textAlign="center">
            No available Notion pages were found. Please verify if your database has data or
            contains correct column names!
          </Text>
          <Button mt="48px" onClick={onBackToFirstStepClick}>
            <Text fontSize="xs" fontWeight="bold">
              BACK TO FIRST STEP
            </Text>
          </Button>
        </Flex>
      );
    }

    return availableNotionDatabasesData?.map((_availableNotionDatabase) => (
      <AvailableNotionDatabase
        key={_availableNotionDatabase.id}
        availableNotionDatabase={_availableNotionDatabase}
        isLoading={isSetNotionDatabaseIdLoading}
        onClick={handleAvailableNotionDatabaseClick}
      />
    ));
  };

  return (
    <TabPanel mx="auto" width={{ sm: '500px', md: '600px', lg: '650px' }}>
      <Flex
        align="center"
        direction="column"
        justify="center"
        mx="auto"
        textAlign="center"
        width="80%"
      >
        <Text color="gray.700" fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold" mb="4px">
          Select a Notion database
        </Text>
        <Text withBalancer color="gray.400" fontSize="sm" fontWeight="normal">
          Please indicate from which Notion database we should use to get your vocabulary.
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        direction="column"
        gap={5}
        mt={{ base: '25px', md: '40px' }}
        width="100%"
      >
        {renderAvailableNotionDatabases()}
      </Flex>
    </TabPanel>
  );
};
