/* eslint-disable unicorn/filename-case */
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });

    return;
  }

  // TODO - validate header key
  // TODO - add login validation
  // TODO - validate body params
  // TODO - create update profile endpoint
  // TODO - allow user to change only api_key and page_id

  res.status(200).json({ name: 'John Doe' });
}
