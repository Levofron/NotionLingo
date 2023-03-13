import { ReactNode } from 'react';

export interface IOnboardingStepLayoutProps {
  backButtonLabel?: string;
  children: ReactNode;
  onBackButtonClick?: () => void;
  onNextButtonClick?: () => void;
  subtitle: string;
  title: string;
}
