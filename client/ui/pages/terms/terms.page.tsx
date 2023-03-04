import { SEO } from '@ui/atoms';
import { SidebarWithHeader } from '@ui/organisms';
import { TermsTemplate } from '@ui/templates';

export const TermsPage = (): JSX.Element => (
  <>
    <SEO title="Terms and Conditions" />
    <SidebarWithHeader />
    <TermsTemplate />
  </>
);
