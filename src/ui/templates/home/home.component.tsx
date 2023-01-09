import { FC } from 'react';

import { Footer, GettingStarted, HomeHero, LogoExplanation, TryItNow } from '@ui/molecules';
import { ContactForm } from '@ui/organisms';

import { useUser } from '@infrastructure/utils';

export const HomeTemplate: FC = (): JSX.Element => {
  const { user } = useUser();

  return (
    <div>
      <HomeHero />
      <GettingStarted />
      <TryItNow />
      <LogoExplanation />
      <ContactForm email={user?.email} fullName={user?.fullName} />
      <Footer />
    </div>
  );
};
