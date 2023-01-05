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
        lazyBehavior="unmount"
        mt={{ sm: '25px', md: '35px' }}
        variant="unstyled"
      >
        <OnboardingTabList
          activeTabs={activeTabs}
          createNotionIntegrationTabRef={createNotionIntegrationTabRef}
          selectNotionPageTabRef={selectNotionPageTabRef}
          setActiveTabs={setActiveTabs}
          shareDatabaseIntegrationTabRef={shareDatabaseIntegrationTabRef}
          validateIntegrationTabRef={validateIntegrationTabRef}
        />
        <TabPanels maxW={{ md: '90%', lg: '100%' }} mt="24px" mx="auto">
          <OnboardingStepOne />
          <OnboardingStepTwo />
          <OnboardingStepThree />
          <OnboardingStepFour />
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
