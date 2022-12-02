import { NextApiRequest, NextApiResponse } from 'next';

export const validateIfParametersExists =
  (parametersDestination: 'body' | 'query', requiredParameters: string[]) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const requestParameters = req[parametersDestination];
    const requestParametersKeys = Object.keys(requestParameters);

    const hasParameters = requestParametersKeys?.every((_requestParametersKey) =>
      requiredParameters.includes(_requestParametersKey),
    );

    if (!hasParameters) {
      res.status(400).json({
        message: `Incorrect request. Your "${parametersDestination}" does not contain all required arguments`,
      });

      return false;
    }

    return true;
  };
