import { functionImportTest } from '@shared/functions';

import { API_ROUTE_SECRET } from '@config/constants';

import { validateRequestMethodMiddleware, validateRouteSecretMiddleware } from '..';
import { withMiddleware } from './with-middleware.function';

const responseJsonFunctionMock = jest.fn().mockReturnThis();
const responseStatusFunctionMock = jest.fn().mockReturnThis();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const response: any = {
  json: responseJsonFunctionMock,
  status: responseStatusFunctionMock,
};

describe('withMiddleware function', () => {
  functionImportTest(withMiddleware);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return undefined if middleware function returns false', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      headers: {
        authorization: '',
      },
    };

    const handlerFunctionMock = jest.fn();

    const result = await withMiddleware(handlerFunctionMock)([validateRouteSecretMiddleware])(
      request,
      response,
    );

    expect(result).toBeUndefined();
    expect(handlerFunctionMock).not.toHaveBeenCalled();
    expect(responseStatusFunctionMock).toHaveBeenCalledTimes(1);
    expect(responseStatusFunctionMock).toHaveBeenCalledWith(401);
    expect(responseJsonFunctionMock).toHaveBeenCalledTimes(1);
    expect(responseJsonFunctionMock).toHaveBeenCalledWith({
      message: 'Invalid api route secret',
    });
  });

  it('should return handler function result if middleware function returns true', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      headers: {
        authorization: API_ROUTE_SECRET,
      },
    };

    const handlerFunctionMock = jest.fn().mockReturnValue('handler function result');

    const result = await withMiddleware(handlerFunctionMock)([validateRouteSecretMiddleware])(
      request,
      response,
    );

    expect(result).toBe('handler function result');
    expect(handlerFunctionMock).toHaveBeenCalledTimes(1);
    expect(handlerFunctionMock).toHaveBeenCalledWith(request, response);
    expect(responseStatusFunctionMock).not.toHaveBeenCalled();
    expect(responseJsonFunctionMock).not.toHaveBeenCalled();
  });

  it('should return handler function result if middleware function returns true and there are multiple middleware functions', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      method: 'GET',
      headers: {
        authorization: API_ROUTE_SECRET,
      },
    };

    const handlerFunctionMock = jest.fn().mockReturnValue('handler function result');

    const result = await withMiddleware(handlerFunctionMock)([
      validateRequestMethodMiddleware('GET'),
      validateRouteSecretMiddleware,
    ])(request, response);

    expect(result).toBe('handler function result');
    expect(handlerFunctionMock).toHaveBeenCalledTimes(1);
    expect(handlerFunctionMock).toHaveBeenCalledWith(request, response);
    expect(responseStatusFunctionMock).not.toHaveBeenCalled();
    expect(responseJsonFunctionMock).not.toHaveBeenCalled();
  });

  it('should return undefined if middleware function returns false and there are multiple middleware functions', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      method: 'GET',
      headers: {
        authorization: API_ROUTE_SECRET,
      },
    };

    const handlerFunctionMock = jest.fn().mockReturnValue('handler function result');

    const result = await withMiddleware(handlerFunctionMock)([
      validateRequestMethodMiddleware('POST'),
      validateRouteSecretMiddleware,
    ])(request, response);

    expect(result).toBeUndefined();
    expect(handlerFunctionMock).not.toHaveBeenCalled();
    expect(responseStatusFunctionMock).toHaveBeenCalledTimes(1);
    expect(responseStatusFunctionMock).toHaveBeenCalledWith(405);
    expect(responseJsonFunctionMock).toHaveBeenCalledTimes(1);
    expect(responseJsonFunctionMock).toHaveBeenCalledWith({
      message: 'Only POST requests allowed',
    });
  });
});
