import { ReactNode } from 'react';

export interface OnboardingStepLayoutProps {
  backButtonLabel?: string;
  children: ReactNode;
  onBackButtonClick?: () => void;
  onNextButtonClick?: () => void;
  subtitle: string;
  title: string;
}
