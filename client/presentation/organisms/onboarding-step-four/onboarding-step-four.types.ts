import { OnboardingStepLayoutProps } from '@presentation/molecules';

export interface OnboardingStepFourProps
  extends Required<Pick<OnboardingStepLayoutProps, 'onBackButtonClick' | 'onNextButtonClick'>> {}
