import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure/config';
import {
  validateIfParametersExistsMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const contactFormData = req.body;

  const { error: contactError } = await supabaseInstance.from('contacts').insert({
    name: contactFormData.name,
    email: contactFormData.email,
    message: contactFormData.message,
  });

  if (contactError) {
    return res.status(500).json(contactError);
  }

  res.status(200).json(contactFormData);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfParametersExistsMiddleware('body', ['name', 'email', 'message']),
];

export default withMiddleware(handler)(middlewareToApply);
