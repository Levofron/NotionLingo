import { functionImportTest } from '@infrastructure/jest';

import { useCopyToClipboard } from './use-copy-to-clipboard.hook';

describe('useCopyToClipboard hook', () => {
  functionImportTest(useCopyToClipboard);
});
