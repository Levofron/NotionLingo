import { FC } from 'react';

import { TabPanels, Tabs } from '@ui/atoms';
import { OnboardingStepOne, OnboardingStepTwo } from '@ui/molecules';

import { IOnboardingTemplateProps } from './onboarding-template.types';

export const OnboardingTemplate: FC<IOnboardingTemplateProps> = (): JSX.Element => (
  <div className="block">
    <Tabs>
      <TabPanels maxW={{ md: '90%', lg: '100%' }} mt="24px" mx="auto">
        <OnboardingStepTwo />
        <OnboardingStepOne />
      </TabPanels>
    </Tabs>
  </div>
);
