import { SEO } from '@ui/atoms';
import { withCheckIfUserLogged } from '@ui/hoc';
import { SidebarWithHeader } from '@ui/organisms';
import { DashboardTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/types/routes';

const DashboardPageComponent = (): JSX.Element => (
  <>
    <SEO noFollow noIndex title="Account Settings" />
    <SidebarWithHeader />
    <DashboardTemplate />
  </>
);

export const DashboardPage = withCheckIfUserLogged(DashboardPageComponent, {
  currentPageUrl: ERoutes.DASHBOARD,
  redirectUrlOnError: ERoutes.ONBOARDING,
  shouldHaveNotionData: true,
});
