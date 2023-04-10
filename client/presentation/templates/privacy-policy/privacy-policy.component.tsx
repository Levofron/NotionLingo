import { Agreements, Footer } from '@presentation/molecules';
import { SidebarWithHeader } from '@presentation/organisms';

import { PRIVACY_POLICY } from './privacy-policy.defaults';

export const PrivacyPolicy = () => (
  <>
    <SidebarWithHeader />
    <Agreements agreements={PRIVACY_POLICY} heading="Privacy Policy" />
    <Footer />
  </>
);
