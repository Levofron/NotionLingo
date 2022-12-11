import { functionImportTest } from '@utils';

import { validateIfUserIsLoggedInMiddleware } from './validate-if-user-is-logged-in-middleware.function';

describe('validateIfUserIsLoggedInMiddleware function', () => {
  functionImportTest(validateIfUserIsLoggedInMiddleware);

  it('should return false if user is not logged in', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const result = await validateIfUserIsLoggedInMiddleware(request, response);

    expect(result).toBeFalsy();
  });
});
