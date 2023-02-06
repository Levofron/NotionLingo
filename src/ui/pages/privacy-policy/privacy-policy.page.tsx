import { SEO } from '@ui/atoms';
import { SidebarWithHeader } from '@ui/organisms';
import { PrivacyPolicyTemplate } from '@ui/templates';

export const PrivacyPolicyPage = (): JSX.Element => (
  <>
    <SEO title="Privacy Policy" />
    <SidebarWithHeader />
    <PrivacyPolicyTemplate />
  </>
);
