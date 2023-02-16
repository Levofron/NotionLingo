import { SEO } from '@ui/atoms';
import { AddWordTemplate } from '@ui/templates';

export const AddWordPage = (): JSX.Element => (
  <>
    <SEO noFollow noIndex title="Add word" />
    <AddWordTemplate />
  </>
);
