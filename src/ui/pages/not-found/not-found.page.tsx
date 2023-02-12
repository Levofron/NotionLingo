import { SEO } from '@ui/atoms';
import { NotFoundTemplate } from '@ui/templates';

export const NotFoundPage = (): JSX.Element => (
  <>
    <SEO noFollow noIndex title="Not found" />
    <NotFoundTemplate />
  </>
);
