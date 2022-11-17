// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.status(405).send({ message: 'Only PUT requests allowed' });

    return;
  }

  // TODO - validate header key
  // TODO - add login validation
  // TODO - create update profile endpoint
  // TODO - allow user to change only api_key and page_id

  res.status(200).json({ name: 'John Doe' });
}
