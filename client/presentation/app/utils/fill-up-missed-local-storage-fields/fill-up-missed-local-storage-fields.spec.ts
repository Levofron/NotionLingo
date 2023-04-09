import { functionImportTest } from '@infrastructure/functions';

import { fillUpMissedLocalStorageFields } from './fill-up-missed-local-storage-fields.function';

describe('fillUpMissedLocalStorageFields function', () => {
  functionImportTest(fillUpMissedLocalStorageFields);
});
