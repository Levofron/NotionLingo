import { SEO } from '@ui/atoms';
import { withCheckIfUserLogged } from '@ui/hoc';
import { OnboardingTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/routes';

const OnboardingPageComponent = (): JSX.Element => (
  <>
    <SEO noFollow noIndex title="Onboarding" />
    <OnboardingTemplate />
  </>
);

export const OnboardingPage = withCheckIfUserLogged(OnboardingPageComponent, {
  currentPageUrl: ERoutes.ONBOARDING,
  redirectUrlOnError: ERoutes.DASHBOARD,
  shouldHaveNotionData: false,
});
