import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });

    return;
  }

  // TODO - validate header key
  // TODO - add login validation
  // TODO - create get logged profile endpoint

  res.status(200).json({ name: 'John Doe' });
}
