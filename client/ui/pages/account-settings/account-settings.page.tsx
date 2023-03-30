import { SEO } from '@ui/atoms';
import { withCheckIfUserLogged } from '@ui/hoc';
import { SidebarWithHeader } from '@ui/organisms';
import { AccountSettingsTemplate } from '@ui/templates';

import { ERoutes } from '@infrastructure/routes';

const AccountSettingsPageComponent = (): JSX.Element => (
  <>
    <SEO noFollow noIndex title="Account Settings" />
    <SidebarWithHeader />
    <AccountSettingsTemplate />
  </>
);

export const AccountSettingsPage = withCheckIfUserLogged(AccountSettingsPageComponent, {
  currentPageUrl: ERoutes.ACCOUNT_SETTINGS,
  redirectUrlOnError: ERoutes.ONBOARDING,
  shouldHaveNotionData: true,
});
