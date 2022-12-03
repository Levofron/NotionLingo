import { functionImportTest } from '@utils';

import { isValidNotionPageSchema } from './is-valid-notion-page-schema.function';

describe('isValidNotionPageSchema function', () => {
  functionImportTest(isValidNotionPageSchema);
});
