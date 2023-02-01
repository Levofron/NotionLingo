import Head from 'next/head';

import { OfflineTemplate } from '@ui/templates';

export const OfflinePage = (): JSX.Element => (
  <>
    <Head>
      <title>Levofrom</title>
    </Head>
    <OfflineTemplate />
  </>
);
