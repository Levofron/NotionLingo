import { Agreements, Footer } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';

import { PRIVACY_POLICY } from './privacy-policy.defaults';

export const PrivacyPolicy = () => (
  <>
    <SidebarWithHeader />
    <Agreements agreements={PRIVACY_POLICY} heading="Privacy Policy" />
    <Footer />
  </>
);
