import { SEO } from '@presentation/atoms';
import { Offline as OfflinePage } from '@presentation/pages';

const Offline = () => (
  <>
    <SEO noFollow noIndex title="Offline" />
    <OfflinePage />
  </>
);

export default Offline;
