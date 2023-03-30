import { functionImportTest } from '@infrastructure/functions';

import { useUser } from './use-user.hook';

describe('useUser hook', () => {
  functionImportTest(useUser);
});
