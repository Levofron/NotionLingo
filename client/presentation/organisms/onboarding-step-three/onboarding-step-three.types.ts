import { OnboardingStepLayoutProps } from '@presentation/molecules';

export interface OnboardingStepThreeProps
  extends Required<Pick<OnboardingStepLayoutProps, 'onBackButtonClick' | 'onNextButtonClick'>> {}
