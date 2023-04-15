import { functionImportTest } from '@shared/functions';

import { API_ROUTE_SECRET } from '@config/constants';

import { validatRoutesecretMiddleware } from './validate-route-secret-middleware.function';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const response: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe('validatRoutesecretMiddleware function', () => {
  functionImportTest(validatRoutesecretMiddleware);

  it('should return false if route secret is not valid', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      headers: {
        authorization: '',
      },
    };

    const result = await validatRoutesecretMiddleware(request, response);

    expect(result).toBeFalsy();
  });

  it('should return true if route secret is valid', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      headers: {
        authorization: API_ROUTE_SECRET,
      },
    };

    const result = await validatRoutesecretMiddleware(request, response);

    expect(result).toBeTruthy();
  });
});
