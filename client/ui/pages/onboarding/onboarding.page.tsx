import { withCheckIfUserLogged } from '@ui/hoc';
import { Onboarding as OnboardingTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/routes';

const OnboardingComponent = () => <OnboardingTemplate />;

export const Onboarding = withCheckIfUserLogged(OnboardingComponent, {
  currentPageUrl: ERoutes.ONBOARDING,
  redirectUrlOnError: ERoutes.DASHBOARD,
  shouldHaveNotionData: false,
});
