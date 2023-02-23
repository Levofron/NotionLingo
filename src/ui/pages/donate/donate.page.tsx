import { SEO } from '@ui/atoms';
import { withCheckIfUserLogged } from '@ui/hoc';
import { SidebarWithHeader } from '@ui/organisms';
import { DonateTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/types/routes';

const DonatePageComponent = (): JSX.Element => (
  <>
    <SEO noFollow noIndex title="Donate" />
    <SidebarWithHeader />
    <DonateTemplate />
  </>
);

export const DonatePage = withCheckIfUserLogged(DonatePageComponent, {
  currentPageUrl: ERoutes.DONATE,
  redirectUrlOnError: ERoutes.ONBOARDING,
  shouldHaveNotionData: true,
});
