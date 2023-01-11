import { NextApiRequest, NextApiResponse } from 'next';

export const validateIfParametersExistsMiddleware =
  (parametersDestination: 'body' | 'query', requiredParameters: string[]) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (requiredParameters.length === 0) {
      res.status(400).json({
        message: 'Incorrect request. Your "requiredParameters" array is empty',
      });

      return false;
    }

    if (['body', 'query'].includes(parametersDestination) === false) {
      res.status(400).json({
        message: 'Incorrect request. Your "parametersDestination" is not "body" or "query"',
      });

      return false;
    }

    const requestParameters = req[parametersDestination];
    const requestParametersKeys = Object.keys(requestParameters);

    const hasParameters = requiredParameters?.every((_requestParametersKey) =>
      requestParametersKeys.includes(_requestParametersKey),
    );

    if (!hasParameters) {
      res.status(400).json({
        message: `Incorrect request. Your "${parametersDestination}" does not contain all required arguments`,
      });

      return false;
    }

    return true;
  };
