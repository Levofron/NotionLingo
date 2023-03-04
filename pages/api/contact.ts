import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure/config';
import { EHttpStatusCode } from '@infrastructure/types/http-status-code';

import {
  validateIfParametersExistsMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const contactFormData = req.body;

  await supabaseInstance
    .from('contacts')
    .insert({
      email: contactFormData.email,
      // TODO - rename in DB
      name: contactFormData.fullName,
      message: contactFormData.message,
    })
    .throwOnError();

  res.status(EHttpStatusCode.OK).json(contactFormData);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfParametersExistsMiddleware('body', ['email', 'fullName', 'message']),
];

export default withMiddleware(handler)(middlewareToApply);
