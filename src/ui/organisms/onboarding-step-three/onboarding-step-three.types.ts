import { IOnboardingStepLayoutProps } from '@ui/molecules';

export interface IOnboardingStepThreeProps
  extends Required<Pick<IOnboardingStepLayoutProps, 'onBackButtonClick' | 'onNextButtonClick'>> {}
