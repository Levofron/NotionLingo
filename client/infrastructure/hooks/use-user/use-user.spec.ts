import { functionImportTest } from '@infrastructure/jest';

import { useUser } from './use-user.hook';

describe('useUser hook', () => {
  functionImportTest(useUser);
});
