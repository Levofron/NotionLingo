import { Agreements, Footer } from '@presentation/molecules';
import { SidebarWithHeader } from '@presentation/organisms';

import { TERMS } from './terms.defaults';

export const Terms = () => (
  <>
    <SidebarWithHeader />
    <Agreements agreements={TERMS} heading="Terms & Conditions" />
    <Footer />
  </>
);
