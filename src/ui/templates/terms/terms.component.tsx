import { Agreements, Footer } from '@ui/molecules';

import { TERMS } from './terms.defaults';

export const TermsTemplate = (): JSX.Element => (
  <>
    <Agreements agreements={TERMS} heading="Terms & Conditions" />
    <Footer />
  </>
);
