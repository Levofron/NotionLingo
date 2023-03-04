import { ChangeEvent, FC } from 'react';

import { InputControl, OnboardingStepLayout } from '@ui/molecules';

import { restModule } from '@adapter/modules';

import { debounce, useAxios } from '@infrastructure/utils';

import { IOnboardingStepFourProps } from './onboarding-step-four.types';

export const OnboardingStepFour: FC<IOnboardingStepFourProps> = ({
  onBackButtonClick,
  onNextButtonClick,
}): JSX.Element => {
  const {
    data: setNotionApiTokenData,
    error: setNotionApiTokenError,
    isLoading: isSetNotionApiTokenLoading,
    mutateAsync: mutateAsyncSetNotionApiToken,
  } = useAxios(restModule.setNotionApiToken);

  const handleInputChange = debounce(async (event: ChangeEvent<HTMLInputElement>) => {
    const result = await mutateAsyncSetNotionApiToken(event.target.value);

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
        errorMessage={setNotionApiTokenError || undefined}
        isDisabled={isSetNotionApiTokenLoading || !!setNotionApiTokenData}
        isLoading={isSetNotionApiTokenLoading}
        label="Integration token"
        name="integrationToken"
        placeholder="Your integration token"
        onChange={handleInputChange}
      />
    </OnboardingStepLayout>
  );
};
