import { FC } from 'react';

import { Flex, Heading, TabPanels, Tabs, Text } from '@presentation/atoms';
import { OnboardingTabList } from '@presentation/molecules';
import {
  OnboardingStepFive,
  OnboardingStepFour,
  OnboardingStepOne,
  OnboardingStepThree,
  OnboardingStepTwo,
} from '@presentation/organisms';

import { OnboardingProps } from './onboarding.types';

export const Onboarding: FC<OnboardingProps> = ({
  activeTabs,
  createNotionIntegrationTabRef,
  displayCreateNotionIntegrationTab,
  displaySelectNotionDatabaseTab,
  displayShareDatabaseIntegrationTab,
  displayValidateIntegrationTab,
  displayVerifyDatabaseTab,
  selectNotionDatabaseTabRef,
  shareDatabaseIntegrationTabRef,
  validateIntegrationTabRef,
  verifyDatabaseTabRef,
}) => (
  <Flex direction="column" overflowX="hidden" px={2} py={{ base: '20px', sm: '25px', md: '55px' }}>
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
          onBackButtonClick={displayVerifyDatabaseTab}
          onNextButtonClick={displayShareDatabaseIntegrationTab}
        />
        <OnboardingStepThree
          onBackButtonClick={displayCreateNotionIntegrationTab}
          onNextButtonClick={displayValidateIntegrationTab}
        />
        {activeTabs.validateIntegration ? (
          <OnboardingStepFour
            onBackButtonClick={displayShareDatabaseIntegrationTab}
            onNextButtonClick={displaySelectNotionDatabaseTab}
          />
        ) : null}
        {activeTabs.selectNotionDatabase ? (
          <OnboardingStepFive onBackButtonClick={displayVerifyDatabaseTab} />
        ) : null}
      </TabPanels>
    </Tabs>
  </Flex>
);
