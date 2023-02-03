import { Faq, Footer, GettingStarted, HomeHero, TryItNow } from '@ui/molecules';
import { ContactForm } from '@ui/organisms';

import { useUser } from '@infrastructure/utils';

export const HomeTemplate = (): JSX.Element => {
  const { user } = useUser();

  return (
    <div>
      <HomeHero />
      <GettingStarted />
      <TryItNow />
      <Faq />
      <ContactForm email={user?.email} fullName={user?.fullName} />
      <Footer />
    </div>
  );
};
