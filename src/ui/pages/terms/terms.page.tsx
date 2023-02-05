import Head from 'next/head';

import { SidebarWithHeader } from '@ui/organisms';
import { TermsTemplate } from '@ui/templates';

export const TermsPage = (): JSX.Element => (
  <>
    <Head>
      <title>Levofron</title>
    </Head>
    <SidebarWithHeader />
    <TermsTemplate />
  </>
);
