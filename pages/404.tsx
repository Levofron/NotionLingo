import { SEO } from '@presentation/atoms';
import { NotFound as NotFoundPage } from '@presentation/pages';

const NotFound = () => (
  <>
    <SEO noFollow noIndex title="Not found" />
    <NotFoundPage />
  </>
);

export default NotFound;
