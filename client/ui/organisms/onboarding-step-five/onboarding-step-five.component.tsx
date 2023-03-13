import { FC, useEffect } from 'react';

import { Button, Flex, Spinner, Text } from '@ui/atoms';
import { AvailableNotionDatabase, OnboardingStepLayout } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { useAxios, useRouter, useToast, useUser } from '@infrastructure/utils';

import { IOnboardingStepFiveProps } from './onboarding-step-five.types';

export const OnboardingStepFive: FC<IOnboardingStepFiveProps> = ({
  onBackButtonClick,
}): JSX.Element => {
  const {
    data: availableNotionDatabasesData,
    isLoading: isAvailableNotionDatabasesLoading,
    mutate: mutateAvailableNotionDatabases,
  } = useAxios(restModule.getAvailableNotionDatabases);

  const { isLoading: isSetNotionDatabaseIdLoading, mutateAsync: mutateAsyncSetNotionDatabaseId } =
    useAxios(restModule.setNotionDatabaseId);

  const toast = useToast();
  const { setNotionData } = useUser();
  const { redirectToDashboard } = useRouter();

  useEffect(mutateAvailableNotionDatabases, []);

  const handleAvailableNotionDatabaseClick = async (databaseId: string) => {
    mutateAsyncSetNotionDatabaseId(databaseId)
      .then(() =>
        toast.success({
          duration: 2000,
          onCloseComplete: () => {
            setNotionData(true);
            redirectToDashboard();
          },
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
          <Button mt="48px" onClick={onBackButtonClick}>
            <Text fontSize="xs" fontWeight="bold">
              Back to first step
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
    <OnboardingStepLayout
      subtitle="Please indicate from which Notion database we should use to get your vocabulary."
      title="Select a Notion database"
    >
      <Flex alignItems="center" direction="column" gap={5} width="100%">
        {renderAvailableNotionDatabases()}
      </Flex>
    </OnboardingStepLayout>
  );
};
