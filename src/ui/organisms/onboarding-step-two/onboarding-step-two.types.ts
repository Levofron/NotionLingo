import { IOnboardingStepLayoutProps } from '@ui/molecules';

export interface IOnboardingStepTwoProps
  extends Required<Pick<IOnboardingStepLayoutProps, 'onBackButtonClick' | 'onNextButtonClick'>> {}
