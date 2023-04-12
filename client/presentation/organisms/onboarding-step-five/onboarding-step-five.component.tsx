import { FC, useEffect } from 'react';

import { Button, Flex, Spinner, Text } from '@presentation/atoms';
import { AvailableNotionDatabase, OnboardingStepLayout } from '@presentation/molecules';

import { useDatabases, useSetDatabaseId } from '@adapter/hooks';

import { useRouter, useToast, useUser } from '@shared/hooks';

import { IOnboardingStepFiveProps } from './onboarding-step-five.types';

export const OnboardingStepFive: FC<IOnboardingStepFiveProps> = ({
  onBackButtonClick,
}): JSX.Element => {
  const { isSetDatabaseIdLoading, setDatabaseId } = useSetDatabaseId();
  const { databases, getDatabases, isDatabasesLoading } = useDatabases();

  const toast = useToast();
  const { setNotionData } = useUser();
  const { redirectToDashboard } = useRouter();

  useEffect(getDatabases, []);

  const handleAvailableNotionDatabaseClick = async (databaseId: string) => {
    setDatabaseId(databaseId)
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
    if (isDatabasesLoading) {
      return <Spinner size="lg" />;
    }

    if (!databases?.length) {
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

    return databases?.map((_database) => (
      <AvailableNotionDatabase
        key={_database.id}
        availableNotionDatabase={_database}
        isLoading={isSetDatabaseIdLoading}
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
