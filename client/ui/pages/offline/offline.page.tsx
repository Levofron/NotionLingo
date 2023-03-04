import { SEO } from '@ui/atoms';
import { OfflineTemplate } from '@ui/templates';

export const OfflinePage = (): JSX.Element => (
  <>
    <SEO noFollow noIndex title="Offline" />
    <OfflineTemplate />
  </>
);
