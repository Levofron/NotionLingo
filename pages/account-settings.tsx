import { SEO } from '@ui/atoms';
import { AccountSettings as AccountSettingsPage } from '@ui/pages';

const AccountSettings = () => (
  <>
    <SEO noFollow noIndex title="Account Settings" />
    <AccountSettingsPage />
  </>
);

export default AccountSettings;
