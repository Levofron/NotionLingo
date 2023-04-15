import { NextApiRequest, NextApiResponse } from 'next';

export type FunctionToCheck = (
  req: NextApiRequest,
  res: NextApiResponse,
) => boolean | Promise<boolean>;
