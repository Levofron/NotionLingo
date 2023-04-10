import { IOnboardingStepLayoutProps } from '@presentation/molecules';

export interface IOnboardingStepFourProps
  extends Required<Pick<IOnboardingStepLayoutProps, 'onBackButtonClick' | 'onNextButtonClick'>> {}
