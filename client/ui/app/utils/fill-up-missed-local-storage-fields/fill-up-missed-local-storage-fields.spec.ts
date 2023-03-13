import { functionImportTest } from '@infrastructure/utils';

import { fillUpMissedLocalStorageFields } from './fill-up-missed-local-storage-fields.function';

describe('fillUpMissedLocalStorageFields function', () => {
  functionImportTest(fillUpMissedLocalStorageFields);
});
