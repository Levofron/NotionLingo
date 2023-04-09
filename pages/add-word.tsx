import { SEO } from '@presentation/atoms';
import { AddWord as AddWordPage } from '@presentation/pages';

const AddWord = () => (
  <>
    <SEO noFollow noIndex title="Account Settings" />
    <AddWordPage />
  </>
);

export default AddWord;
