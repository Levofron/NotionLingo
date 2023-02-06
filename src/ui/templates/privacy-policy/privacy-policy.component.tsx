import { Agreements, Footer } from '@ui/molecules';

import { PRIVACY_POLICY } from './privacy-policy.defaults';

export const PrivacyPolicyTemplate = (): JSX.Element => (
  <>
    <Agreements agreements={PRIVACY_POLICY} heading="Privacy & Policy" />
    <Footer />
  </>
);
