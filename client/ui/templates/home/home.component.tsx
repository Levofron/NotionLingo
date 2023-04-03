import { useRef } from 'react';

import { Box } from '@ui/atoms';
import { Faq, Footer, GettingStarted, HomeHero, TryItNow } from '@ui/molecules';
import { ContactForm, SidebarWithHeader } from '@ui/organisms';

export const Home = () => {
  const gettingStartedRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SidebarWithHeader />
      <Box bg="gray.50" h="100%" w="100%">
        <HomeHero gettingStartedRef={gettingStartedRef} />
        <GettingStarted ref={gettingStartedRef} />
        <TryItNow />
        <Faq />
        <ContactForm />
        <Footer />
      </Box>
    </>
  );
};
