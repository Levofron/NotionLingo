import { NextApiResponse } from 'next';
import { AxiomAPIRequest } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';

import { isError } from '@shared/guards';

import { EHttpStatusCode } from '@server/http-status-code';

import { TFunctionToCheck } from './with-middleware.types';

const getExceptionStatus = (exception: unknown) =>
  exception instanceof ApiError ? exception.statusCode : EHttpStatusCode.INTERNAL_SERVER_ERROR;

const getExceptionMessage = (exception: unknown) =>
  isError(exception) ? exception.message : 'Internal Server Error';

const getExceptionStack = (exception: unknown) =>
  isError(exception) ? exception.stack : undefined;

export const withMiddleware =
  <THandlerResponse>(handler: (req: AxiomAPIRequest, res: NextApiResponse) => THandlerResponse) =>
  (functionsToCheck: TFunctionToCheck[]) =>
  async (req: AxiomAPIRequest, res: NextApiResponse) => {
    for (const functionToCheck of functionsToCheck) {
      // eslint-disable-next-line no-await-in-loop
      const result = await functionToCheck(req, res);

      if (!result) {
        return;
      }
    }

    try {
      const result = await handler(req, res);

      return result;
    } catch (error) {
      req.log.error(JSON.stringify(error));

      const currentDate = new Date();
      const isoDate = currentDate.toISOString();

      const stack = getExceptionStack(error);
      const message = getExceptionMessage(error);
      const statusCode = getExceptionStatus(error);

      const responseBody = {
        stack,
        message,
        statusCode,
        path: req.url,
        timestamp: isoDate,
      };

      return res.status(statusCode).send(responseBody);
    }
  };
