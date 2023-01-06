import { FC, useRef, useState } from 'react';

import { Flex, TabPanels, Tabs, Text } from '@ui/atoms';
import {
  IActiveTabs,
  OnboardingStepOne,
  OnboardingStepTwo,
  OnboardingTabList,
} from '@ui/molecules';
import { OnboardingStepFour, OnboardingStepThree } from '@ui/organisms';

import { IOnboardingTemplateProps } from './onboarding-template.types';

export const OnboardingTemplate: FC<IOnboardingTemplateProps> = (): JSX.Element => {
  const selectNotionPageTabRef = useRef<HTMLButtonElement | null>(null);
  const validateIntegrationTabRef = useRef<HTMLButtonElement | null>(null);
  const createNotionIntegrationTabRef = useRef<HTMLButtonElement | null>(null);
  const shareDatabaseIntegrationTabRef = useRef<HTMLButtonElement | null>(null);

  const [activeTabs, setActiveTabs] = useState<IActiveTabs>({
    createNotionIntegration: true,
    shareDatabaseIntegration: false,
    validateIntegration: false,
    selectNotionPage: false,
  });

  const displayCreateNotionIntegrationTab = () => {
    createNotionIntegrationTabRef.current?.click();

    setActiveTabs({
      createNotionIntegration: true,
      shareDatabaseIntegration: false,
      validateIntegration: false,
      selectNotionPage: false,
    });
  };

  const displayShareDatabaseIntegrationTab = () => {
    shareDatabaseIntegrationTabRef.current?.click();

    setActiveTabs({
      createNotionIntegration: true,
      shareDatabaseIntegration: true,
      validateIntegration: false,
      selectNotionPage: false,
    });
  };

  const displayValidateIntegrationTab = () => {
    validateIntegrationTabRef.current?.click();

    setActiveTabs({
      createNotionIntegration: true,
      shareDatabaseIntegration: true,
      validateIntegration: true,
      selectNotionPage: false,
    });
  };

  const displaySelectNotionPageTab = () => {
    selectNotionPageTabRef.current?.click();

    setActiveTabs({
      createNotionIntegration: true,
      shareDatabaseIntegration: true,
      validateIntegration: true,
      selectNotionPage: true,
    });
  };

  return (
    <Flex direction="column" pt={{ base: '20px', sm: '25px', md: '55px' }} px={2}>
      <Flex direction="column" textAlign="center">
        <Text
          color="gray.700"
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
          fontWeight="bold"
          mb="8px"
        >
          Configure your Notion integration
        </Text>
        <Text color="gray.400" fontSize={{ sm: 'sm', md: 'lg' }} fontWeight="normal">
          This information will let us know from which Notion page we should use to get your
          vocabulary.
        </Text>
      </Flex>
      <Tabs
        isLazy
        display="flex"
        flexDirection="column"
        mt={{ sm: '25px', md: '35px' }}
        variant="unstyled"
      >
        <OnboardingTabList
          activeTabs={activeTabs}
          createNotionIntegrationTabRef={createNotionIntegrationTabRef}
          selectNotionPageTabRef={selectNotionPageTabRef}
          shareDatabaseIntegrationTabRef={shareDatabaseIntegrationTabRef}
          validateIntegrationTabRef={validateIntegrationTabRef}
        />
        <TabPanels maxW={{ md: '90%', lg: '100%' }} mt="24px" mx="auto">
          <OnboardingStepOne onNextButtonClick={displayShareDatabaseIntegrationTab} />
          {activeTabs.shareDatabaseIntegration ? (
            <OnboardingStepTwo
              onNextButtonClick={displayValidateIntegrationTab}
              onPreviousButtonClick={displayCreateNotionIntegrationTab}
            />
          ) : null}
          {activeTabs.validateIntegration ? (
            <OnboardingStepThree
              onNextButtonClick={displaySelectNotionPageTab}
              onPreviousButtonClick={displayShareDatabaseIntegrationTab}
            />
          ) : null}
          {activeTabs.selectNotionPage ? <OnboardingStepFour /> : null}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
