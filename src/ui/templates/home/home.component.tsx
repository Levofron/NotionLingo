import { Box } from '@ui/atoms';
import { Faq, Footer, GettingStarted, HomeHero, TryItNow } from '@ui/molecules';
import { ContactForm } from '@ui/organisms';

export const HomeTemplate = (): JSX.Element => (
  <Box bg="gray.50" h="100%" w="100%">
    <HomeHero />
    <GettingStarted />
    <TryItNow />
    <Faq />
    <ContactForm />
    <Footer />
  </Box>
);
