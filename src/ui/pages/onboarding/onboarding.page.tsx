import Head from 'next/head';
import { FC } from 'react';

import { OnboardingTemplate } from '@ui/templates';

export const OnboardingPage: FC = (): JSX.Element => (
  <div className="block">
    <Head>
      <title>Levofron</title>
    </Head>
    <OnboardingTemplate />
  </div>
);
