import { functionImportTest } from '@infrastructure/utils';

import { validateRouteSecretMiddleware } from './validate-route-secret-middleware.function';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const response: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe('validateRouteSecretMiddleware function', () => {
  functionImportTest(validateRouteSecretMiddleware);

  it('should return false if route secret is not valid', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      headers: {
        authorization: '',
      },
    };

    const result = await validateRouteSecretMiddleware(request, response);

    expect(result).toBeFalsy();
  });

  it('should return true if route secret is valid', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      headers: {
        authorization: process.env.NEXT_PUBLIC_API_ROUTE_SECRET,
      },
    };

    const result = await validateRouteSecretMiddleware(request, response);

    expect(result).toBeTruthy();
  });
});
