import { IOnboardingStepLayoutProps } from '@presentation/molecules';

export interface IOnboardingStepTwoProps
  extends Required<Pick<IOnboardingStepLayoutProps, 'onBackButtonClick' | 'onNextButtonClick'>> {}
