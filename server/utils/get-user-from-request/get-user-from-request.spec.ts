import { functionImportTest } from '@infrastructure/functions';

import { getUserFromRequest } from './get-user-from-request.function';

describe('getUserFromRequest function', () => {
  functionImportTest(getUserFromRequest);

  it('should return null if no user is found', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await getUserFromRequest({} as any);

    expect(user).toBeNull();
  });
});
