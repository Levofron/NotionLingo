import { withCheckIfUserLogged } from '@presentation/hoc';
import { Donate as DonateTemplate } from '@presentation/templates';

import { Routes } from '@shared/routes';

const DonateComponent = () => <DonateTemplate />;

export const Donate = withCheckIfUserLogged(DonateComponent, {
  currentPageUrl: Routes.DONATE,
  redirectUrlOnError: Routes.ONBOARDING,
  shouldHaveNotionData: true,
});
