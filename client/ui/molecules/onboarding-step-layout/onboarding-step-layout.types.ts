import { ReactNode } from 'react';

export interface IOnboardingStepLayoutProps {
  children: ReactNode;
  onBackButtonClick?: () => void;
  onNextButtonClick?: () => void;
  subtitle: string;
  title: string;
}
