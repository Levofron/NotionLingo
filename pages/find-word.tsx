import { SEO } from '@ui/atoms';
import { FindWord as FindWordPage } from '@ui/pages';

const FindWord = () => (
  <>
    <SEO noFollow noIndex title="Find word" />
    <FindWordPage />
  </>
);

export default FindWord;
