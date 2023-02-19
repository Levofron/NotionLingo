import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure/config';
import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import {
  validateIfParametersExistsMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const contactFormData = req.body;

  await supabaseInstance
    .from('contacts')
    .insert({
      fullName: contactFormData.name,
      email: contactFormData.email,
      message: contactFormData.message,
    })
    .throwOnError();

  res.status(EHttpStatusCode.OK).json(contactFormData);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfParametersExistsMiddleware('body', ['name', 'email', 'message']),
];

export default withMiddleware(handler)(middlewareToApply);
