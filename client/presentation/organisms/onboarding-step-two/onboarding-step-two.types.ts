import { OnboardingStepLayoutProps } from '@presentation/molecules';

export interface OnboardingStepTwoProps
  extends Required<Pick<OnboardingStepLayoutProps, 'onBackButtonClick' | 'onNextButtonClick'>> {}
