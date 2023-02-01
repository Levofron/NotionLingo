import Head from 'next/head';

import { NotFoundTemplate } from '@ui/templates';

export const NotFoundPage = (): JSX.Element => (
  <>
    <Head>
      <title>Levofron</title>
    </Head>
    <NotFoundTemplate />
  </>
);
