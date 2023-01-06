import { FC, useEffect } from 'react';

import { restModule } from '@adapter/index';

import { Flex, Spinner, TabPanel, Text } from '@ui/atoms';
import { AvailableNotionPage } from '@ui/molecules';

import { useAxiosAction } from '@infrastructure/utils';

import { IOnboardingStepFourProps } from './onboarding-step-four.types';

export const OnboardingStepFour: FC<IOnboardingStepFourProps> = (): JSX.Element => {
  const {
    data: availableNotionPages,
    execute: fetchAvailableNotionPages,
    loading: isAvailableNotionPagesLoading,
  } = useAxiosAction(restModule.getAvailableNotionPages);

  const { execute: setNotionPageId, loading: isSetNotionPageIdLoading } = useAxiosAction(
    restModule.setNotionPageId,
  );

  useEffect(() => {
    fetchAvailableNotionPages();
  }, []);

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
        {!isAvailableNotionPagesLoading ? (
          availableNotionPages?.map((availableNotionPage) => (
            <AvailableNotionPage
              key={availableNotionPage.id}
              availableNotionPage={availableNotionPage}
              isLoading={isSetNotionPageIdLoading}
              onClick={setNotionPageId}
            />
          ))
        ) : (
          <Spinner size="lg" />
        )}
      </Flex>
    </TabPanel>
  );
};
