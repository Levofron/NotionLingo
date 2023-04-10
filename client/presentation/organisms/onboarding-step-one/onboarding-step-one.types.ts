import { IOnboardingStepLayoutProps } from '@presentation/molecules';

export interface IOnboardingStepOneProps
  extends Required<Pick<IOnboardingStepLayoutProps, 'onNextButtonClick'>> {}
