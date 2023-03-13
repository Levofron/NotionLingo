import { functionImportTest } from '@infrastructure/utils';

import { useCopyToClipboard } from './use-copy-to-clipboard.hook';

describe('useCopyToClipboard hook', () => {
  functionImportTest(useCopyToClipboard);
});
