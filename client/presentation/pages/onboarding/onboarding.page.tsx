import { withCheckIfUserLogged } from '@presentation/hoc';
import { Onboarding as OnboardingTemplate } from '@presentation/templates';

import { ERoutes } from '@infrastructure/routes';

const OnboardingComponent = () => <OnboardingTemplate />;

export const Onboarding = withCheckIfUserLogged(OnboardingComponent, {
  redirectUrlOnError: ERoutes.DASHBOARD,
  shouldHaveNotionData: false,
});
