import { FC } from 'react';

import { GettingStarted, HomeHero } from '@ui/molecules';

export const HomeTemplate: FC = (): JSX.Element => (
  <div>
    <HomeHero />
    <GettingStarted />
  </div>
);
