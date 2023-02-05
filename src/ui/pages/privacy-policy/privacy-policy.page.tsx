import Head from 'next/head';

import { SidebarWithHeader } from '@ui/organisms';
import { PrivacyPolicyTemplate } from '@ui/templates';

export const PrivacyPolicyPage = (): JSX.Element => (
  <>
    <Head>
      <title>Levofron</title>
    </Head>
    <SidebarWithHeader />
    <PrivacyPolicyTemplate />
  </>
);
