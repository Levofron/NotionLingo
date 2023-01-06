import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { restModule } from '@adapter';

import { Flex, Spinner, TabPanel, Text } from '@ui/atoms';
import { AvailableNotionPage } from '@ui/molecules';

import { ERoutes } from '@infrastructure/types/routes';
import { useAxiosAction } from '@infrastructure/utils';

import { IOnboardingStepFourProps } from './onboarding-step-four.types';

export const OnboardingStepFour: FC<IOnboardingStepFourProps> = (): JSX.Element => {
  const {
    data: availableNotionPages,
    execute: fetchAvailableNotionPages,
    loading: isAvailableNotionPagesLoading,
  } = useAxiosAction(restModule.getAvailableNotionPages);

  const router = useRouter();

  const { execute: setNotionPageId, loading: isSetNotionPageIdLoading } = useAxiosAction(
    restModule.setNotionPageId,
  );

  useEffect(() => {
    fetchAvailableNotionPages();
  }, []);

  const handleAvailableNotionPageClick = async (pageId: string) => {
    const result = await setNotionPageId(pageId);

    if (result) {
      router.push(ERoutes.DASHBOARD);
    }
  };

  const renderAvailableNotionPages = () => {
    if (isAvailableNotionPagesLoading) {
      return <Spinner size="lg" />;
    }

    if (!availableNotionPages?.length) {
      return (
        <Text color="gray.400" fontSize="sm" fontWeight="normal">
          No available Notion pages were found. Please verify if your database has data or contains
          correct column names.
        </Text>
      );
    }

    return availableNotionPages?.map((availableNotionPage) => (
      <AvailableNotionPage
        key={availableNotionPage.id}
        availableNotionPage={availableNotionPage}
        isLoading={isSetNotionPageIdLoading}
        onClick={handleAvailableNotionPageClick}
      />
    ));
  };

  return (
    <TabPanel mx="auto" w={{ sm: '500px', md: '600px', lg: '650px' }}>
      <Flex mb="40px">
        <Flex
          align="center"
          direction="column"
          justify="center"
          mx="auto"
          textAlign="center"
          w="80%"
        >
          <Text color="gray.700" fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold" mb="4px">
            Select a Notion page
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="normal">
            Please indicate from which Notion page we should use to get your vocabulary.
          </Text>
        </Flex>
      </Flex>
      <Flex alignItems="center" direction="column" gap={5} w="100%">
        {renderAvailableNotionPages()}
      </Flex>
    </TabPanel>
  );
};
