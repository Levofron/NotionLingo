import { functionImportTest } from '@infrastructure/utils';

import { useUser } from './use-user.hook';

describe('useUser hook', () => {
  functionImportTest(useUser);
});
