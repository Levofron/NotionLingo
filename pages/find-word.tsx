import { SEO } from '@presentation/atoms';
import { FindWord as FindWordPage } from '@presentation/pages';

const FindWord = () => (
  <>
    <SEO noFollow noIndex title="Find word" />
    <FindWordPage />
  </>
);

export default FindWord;
