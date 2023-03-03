import { useRef, useState } from 'react';

import { Flex, Heading, TabPanels, Tabs, Text } from '@ui/atoms';
import { IActiveTabs, OnboardingTabList } from '@ui/molecules';
import {
  OnboardingStepFive,
  OnboardingStepFour,
  OnboardingStepOne,
  OnboardingStepThree,
  OnboardingStepTwo,
} from '@ui/organisms';

export const OnboardingTemplate = (): JSX.Element => {
  const verifyDatabaseTabRef = useRef<HTMLButtonElement | null>(null);
  const validateIntegrationTabRef = useRef<HTMLButtonElement | null>(null);
  const selectNotionDatabaseTabRef = useRef<HTMLButtonElement | null>(null);
  const createNotionIntegrationTabRef = useRef<HTMLButtonElement | null>(null);
  const shareDatabaseIntegrationTabRef = useRef<HTMLButtonElement | null>(null);

  const [activeTabs, setActiveTabs] = useState<IActiveTabs>({
    verifyDatabase: true,
    createNotionIntegration: false,
    shareDatabaseIntegration: false,
    validateIntegration: false,
    selectNotionDatabase: false,
  });

  const displayVerifyDatabaseTab = () => {
    verifyDatabaseTabRef.current?.click();

    setActiveTabs({
      verifyDatabase: true,
      createNotionIntegration: false,
      shareDatabaseIntegration: false,
      validateIntegration: false,
      selectNotionDatabase: false,
    });
  };

  const displayCreateNotionIntegrationTab = () => {
    createNotionIntegrationTabRef.current?.click();

    setActiveTabs({
      verifyDatabase: true,
      createNotionIntegration: true,
      shareDatabaseIntegration: false,
      validateIntegration: false,
      selectNotionDatabase: false,
    });
  };

  const displayShareDatabaseIntegrationTab = () => {
    shareDatabaseIntegrationTabRef.current?.click();

    setActiveTabs({
      verifyDatabase: true,
      createNotionIntegration: true,
      shareDatabaseIntegration: true,
      validateIntegration: false,
      selectNotionDatabase: false,
    });
  };

  const displayValidateIntegrationTab = () => {
    validateIntegrationTabRef.current?.click();

    setActiveTabs({
      verifyDatabase: true,
      createNotionIntegration: true,
      shareDatabaseIntegration: true,
      validateIntegration: true,
      selectNotionDatabase: false,
    });
  };

  const displaySelectNotionDatabaseTab = () => {
    selectNotionDatabaseTabRef.current?.click();

    setActiveTabs({
      verifyDatabase: true,
      createNotionIntegration: true,
      shareDatabaseIntegration: true,
      validateIntegration: true,
      selectNotionDatabase: true,
    });
  };

  return (
    <Flex
      direction="column"
      overflowX="hidden"
      px={2}
      py={{ base: '20px', sm: '25px', md: '55px' }}
    >
      <Flex direction="column" textAlign="center">
        <Heading
          color="gray.700"
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
          fontWeight="bold"
          mb="8px"
        >
          Configure your Notion integration
        </Heading>
        <Text withBalancer color="gray.400" fontWeight="normal">
          This information will let us know from which Notion database we should use to get your
          vocabulary.
        </Text>
      </Flex>
      <Tabs
        isLazy
        display="flex"
        flexDirection="column"
        mt={{ base: '10px', sm: '25px', md: '35px' }}
        variant="unstyled"
      >
        <OnboardingTabList
          activeTabs={activeTabs}
          createNotionIntegrationTabRef={createNotionIntegrationTabRef}
          selectNotionDatabaseTabRef={selectNotionDatabaseTabRef}
          shareDatabaseIntegrationTabRef={shareDatabaseIntegrationTabRef}
          validateIntegrationTabRef={validateIntegrationTabRef}
          verifyDatabaseTabRef={verifyDatabaseTabRef}
        />
        <TabPanels maxW={{ md: '90%', lg: '100%' }} mt={{ base: '10px', md: '24px' }} mx="auto">
          <OnboardingStepOne onNextButtonClick={displayCreateNotionIntegrationTab} />
          <OnboardingStepTwo
            onNextButtonClick={displayShareDatabaseIntegrationTab}
            onPreviousButtonClick={displayVerifyDatabaseTab}
          />
          <OnboardingStepThree
            onNextButtonClick={displayValidateIntegrationTab}
            onPreviousButtonClick={displayCreateNotionIntegrationTab}
          />
          {activeTabs.validateIntegration ? (
            <OnboardingStepFour
              onNextButtonClick={displaySelectNotionDatabaseTab}
              onPreviousButtonClick={displayShareDatabaseIntegrationTab}
            />
          ) : null}
          {activeTabs.selectNotionDatabase ? (
            <OnboardingStepFive onBackToFirstStepClick={displayVerifyDatabaseTab} />
          ) : null}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
