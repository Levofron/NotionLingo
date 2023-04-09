import { IOnboardingStepLayoutProps } from '@presentation/molecules';

export interface IOnboardingStepThreeProps
  extends Required<Pick<IOnboardingStepLayoutProps, 'onBackButtonClick' | 'onNextButtonClick'>> {}
