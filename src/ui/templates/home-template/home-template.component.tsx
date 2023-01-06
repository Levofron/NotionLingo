import { FC } from 'react';

import { Footer, FullScreenLoader, GettingStarted, HomeHero, TryItNow } from '@ui/molecules';
import { ContactForm } from '@ui/organisms';

import { useUser } from '@infrastructure/utils';

export const HomeTemplate: FC = (): JSX.Element => {
  const { user } = useUser();

  return <FullScreenLoader />;

  return (
    <div>
      <HomeHero />
      <GettingStarted />
      <TryItNow />
      <ContactForm email={user?.email} fullName={user?.fullName} />
      <Footer />
    </div>
  );
};
