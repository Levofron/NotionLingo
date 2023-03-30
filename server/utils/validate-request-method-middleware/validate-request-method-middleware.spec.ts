import { functionImportTest } from '@infrastructure/functions';

import { validateRequestMethodMiddleware } from './validate-request-method-middleware.function';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const response: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe('validateRequestMethodMiddleware function', () => {
  functionImportTest(validateRequestMethodMiddleware);

  it('should return false if request method is not valid', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      method: 'POST',
    };

    const result = await validateRequestMethodMiddleware('GET')(request, response);

    expect(result).toBeFalsy();
  });

  it('should return true if request method is valid', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      method: 'GET',
    };

    const result = await validateRequestMethodMiddleware('GET')(request, response);

    expect(result).toBeTruthy();
  });
});
