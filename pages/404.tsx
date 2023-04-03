import { SEO } from '@ui/atoms';
import { NotFound as NotFoundPage } from '@ui/pages';

const NotFound = () => (
  <>
    <SEO noFollow noIndex title="Not found" />
    <NotFoundPage />
  </>
);

export default NotFound;
