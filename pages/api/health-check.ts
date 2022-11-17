import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });

    return;
  }

  // TODO - validate header key

  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  res.status(200).send(isoDate);
};

export default handler;
