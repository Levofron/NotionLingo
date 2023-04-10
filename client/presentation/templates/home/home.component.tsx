import { useRef } from 'react';

import { Box } from '@presentation/atoms';
import {
  Faq,
  Footer,
  GettingStarted,
  HomeHero,
  Testimonials,
  TryItNow,
} from '@presentation/molecules';
import { ContactForm, SidebarWithHeader } from '@presentation/organisms';

export const Home = () => {
  const gettingStartedRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SidebarWithHeader />
      <Box bg="gray.50" h="100%" w="100%">
        <HomeHero gettingStartedRef={gettingStartedRef} />
        <GettingStarted ref={gettingStartedRef} />
        <TryItNow />
        <Testimonials />
        <Faq />
        <ContactForm />
        <Footer />
      </Box>
    </>
  );
};
