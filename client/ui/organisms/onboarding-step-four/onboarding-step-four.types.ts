import { IOnboardingStepLayoutProps } from '@ui/molecules';

export interface IOnboardingStepFourProps
  extends Required<Pick<IOnboardingStepLayoutProps, 'onBackButtonClick' | 'onNextButtonClick'>> {}
