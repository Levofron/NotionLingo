import { functionImportTest } from '@infrastructure/functions';

import { useCopyToClipboard } from './use-copy-to-clipboard.hook';

describe('useCopyToClipboard hook', () => {
  functionImportTest(useCopyToClipboard);
});
