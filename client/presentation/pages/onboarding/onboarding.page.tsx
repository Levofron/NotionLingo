import { withCheckIfUserLogged } from '@presentation/hoc';
import { Onboarding as OnboardingTemplate } from '@presentation/templates';

import { Routes } from '@shared/routes';

const OnboardingComponent = () => <OnboardingTemplate />;

export const Onboarding = withCheckIfUserLogged(OnboardingComponent, {
  currentPageUrl: Routes.ONBOARDING,
  redirectUrlOnError: Routes.DASHBOARD,
  shouldHaveNotionData: false,
});
