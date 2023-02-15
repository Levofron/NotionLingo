import { SEO } from '@ui/atoms';
import { SidebarWithHeader } from '@ui/organisms';
import { FindWordTemplate } from '@ui/templates';

export const FindWordPage = (): JSX.Element => (
  <>
    <SEO noFollow noIndex title="Find word" />
    <SidebarWithHeader />
    <FindWordTemplate />
  </>
);
