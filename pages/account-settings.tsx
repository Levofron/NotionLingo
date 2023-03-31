import { SEO } from '@ui/atoms';
import { SidebarWithHeader } from '@ui/organisms';
import { AccountSettings as AccountSettingsPage } from '@ui/pages';

const AccountSettings = () => (
  <>
    <SEO noFollow noIndex title="Account Settings" />
    <SidebarWithHeader />
    <AccountSettingsPage />
  </>
);

export default AccountSettings;
