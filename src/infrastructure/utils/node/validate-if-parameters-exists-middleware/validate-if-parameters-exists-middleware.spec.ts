import { functionImportTest } from '@infrastructure/utils';

import { validateIfParametersExistsMiddleware } from './validate-if-parameters-exists-middleware.function';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request: any = {
  query: {
    name: 'name',
    email: 'email',
    password: 'password',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const response: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe('validateIfParametersExistsMiddleware function', () => {
  functionImportTest(validateIfParametersExistsMiddleware);

  it('should return true if all parameters exists', async () => {
    const result = await validateIfParametersExistsMiddleware('query', [
      'name',
      'email',
      'password',
    ])(request, response);

    expect(result).toBeTruthy();
  });

  it('should return false if requiredParameters is empty', async () => {
    const result = await validateIfParametersExistsMiddleware('query', [])(request, response);

    expect(result).toBeFalsy();
  });

  it('should return false if request does not have parametersDestination', async () => {
    // @ts-expect-error
    const result = await validateIfParametersExistsMiddleware('params', ['name', 'email'])(
      // @ts-expect-error
      {},
      response,
    );

    expect(result).toBeFalsy();
  });
});
