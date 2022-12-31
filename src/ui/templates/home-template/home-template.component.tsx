import { FC } from 'react';

import { GettingStarted, HomeHero } from '@ui/molecules';
import { ContactForm } from '@ui/organisms';

import { useUser } from '@infrastructure/utils';

export const HomeTemplate: FC = (): JSX.Element => {
  const { user } = useUser();

  return (
    <div>
      <HomeHero />
      <GettingStarted />
      <ContactForm email={user?.email} fullName={user?.fullName} />
    </div>
  );
};
