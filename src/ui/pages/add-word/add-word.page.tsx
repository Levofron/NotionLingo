import { SEO } from '@ui/atoms';
import { SidebarWithHeader } from '@ui/organisms';
import { AddWordTemplate } from '@ui/templates';

export const AddWordPage = (): JSX.Element => (
  <>
    <SEO noFollow noIndex title="Add word" />
    <SidebarWithHeader />
    <AddWordTemplate />
  </>
);
