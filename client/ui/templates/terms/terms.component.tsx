import { Agreements, Footer } from '@ui/molecules';
import { SidebarWithHeader } from '@ui/organisms';

import { TERMS } from './terms.defaults';

export const Terms = () => (
  <>
    <SidebarWithHeader />
    <Agreements agreements={TERMS} heading="Terms & Conditions" />
    <Footer />
  </>
);
