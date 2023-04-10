import { SEO } from '@presentation/atoms';
import { AccountSettings as AccountSettingsPage } from '@presentation/pages';

const AccountSettings = () => (
  <>
    <SEO noFollow noIndex title="Account Settings" />
    <AccountSettingsPage />
  </>
);

export default AccountSettings;
