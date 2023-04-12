import { withCheckIfUserLogged } from '@presentation/hoc';
import { Onboarding as OnboardingTemplate } from '@presentation/templates';

import { ERoutes } from '@shared/routes';

const OnboardingComponent = () => <OnboardingTemplate />;

export const Onboarding = withCheckIfUserLogged(OnboardingComponent, {
  currentPageUrl: ERoutes.ONBOARDING,
  redirectUrlOnError: ERoutes.DASHBOARD,
  shouldHaveNotionData: false,
});
