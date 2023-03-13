import { ChangeEvent, FC } from 'react';

import { InputControl, OnboardingStepLayout } from '@ui/molecules';

import { useSetApiToken } from '@adapter/hooks';

import { debounce } from '@infrastructure/utils';

import { IOnboardingStepFourProps } from './onboarding-step-four.types';

export const OnboardingStepFour: FC<IOnboardingStepFourProps> = ({
  onBackButtonClick,
  onNextButtonClick,
}): JSX.Element => {
  const { hasApiTokenData, isSetApiTokenLoading, setApiToken, setApiTokenError } = useSetApiToken();

  const handleInputChange = debounce(async (event: ChangeEvent<HTMLInputElement>) => {
    const result = await setApiToken(event.target.value);

    if (result) {
      onNextButtonClick();
    }
  }, 1000);

  return (
    <OnboardingStepLayout
      subtitle="Paste your copied integration token below to validate your integration."
      title="Validate your integration"
      onBackButtonClick={onBackButtonClick}
    >
      <InputControl
        isRequired
        errorMessage={setApiTokenError || undefined}
        isDisabled={isSetApiTokenLoading || hasApiTokenData}
        isLoading={isSetApiTokenLoading}
        label="Integration token"
        name="integrationToken"
        placeholder="Your integration token"
        onChange={handleInputChange}
      />
    </OnboardingStepLayout>
  );
};
