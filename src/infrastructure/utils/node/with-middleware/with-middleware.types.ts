import { NextApiRequest, NextApiResponse } from 'next';

export type TFunctionToCheck = (
  req: NextApiRequest,
  res: NextApiResponse,
) => boolean | Promise<boolean>;
