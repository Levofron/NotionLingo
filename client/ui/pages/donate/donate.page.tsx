import { withCheckIfUserLogged } from '@ui/hoc';
import { Donate as DonateTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/routes';

const DonateComponent = () => <DonateTemplate />;

export const Donate = withCheckIfUserLogged(DonateComponent, {
  currentPageUrl: ERoutes.DONATE,
  redirectUrlOnError: ERoutes.ONBOARDING,
  shouldHaveNotionData: true,
});
