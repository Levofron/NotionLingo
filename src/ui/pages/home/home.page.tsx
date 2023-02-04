import { SEO } from '@ui/atoms';
import { SidebarWithHeader } from '@ui/organisms';
import { HomeTemplate } from '@ui/templates';

export const HomePage = (): JSX.Element => (
  <>
    <SEO title="Improve vocabulary with your Notion database" />
    <SidebarWithHeader />
    <HomeTemplate />
  </>
);
