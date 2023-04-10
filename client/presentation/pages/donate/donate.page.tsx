import { withCheckIfUserLogged } from '@presentation/hoc';
import { Donate as DonateTemplate } from '@presentation/templates';

import { ERoutes } from '@infrastructure/routes';

const DonateComponent = () => <DonateTemplate />;

export const Donate = withCheckIfUserLogged(DonateComponent, {
  redirectUrlOnError: ERoutes.ONBOARDING,
  shouldHaveNotionData: true,
});
