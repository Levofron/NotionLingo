import { functionImportTest } from '@utils';

import { getUserFromRequest } from './get-user-from-request.function';

describe('getUserFromRequest function', () => {
  functionImportTest(getUserFromRequest);
});
