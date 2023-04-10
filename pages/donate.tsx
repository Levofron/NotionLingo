import { SEO } from '@presentation/atoms';
import { Donate as DonatePage } from '@presentation/pages';

const Donate = () => (
  <>
    <SEO noFollow noIndex title="Donate" />
    <DonatePage />
  </>
);

export default Donate;
