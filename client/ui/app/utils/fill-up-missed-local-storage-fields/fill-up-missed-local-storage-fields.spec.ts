import { functionImportTest } from '@infrastructure/jest';

import { fillUpMissedLocalStorageFields } from './fill-up-missed-local-storage-fields.function';

describe('fillUpMissedLocalStorageFields function', () => {
  functionImportTest(fillUpMissedLocalStorageFields);
});
