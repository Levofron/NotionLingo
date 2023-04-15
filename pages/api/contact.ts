import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';

import { HttpStatusCode } from '@server/http-status-code';
import {
  validateIfParametersExistsMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

import { supabaseInstance } from '@config/supabase.instance';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const contactFormData = req.body;

  await supabaseInstance
    .from('contacts')
    .insert({
      email: contactFormData.email,
      message: contactFormData.message,
      full_name: contactFormData.fullName,
    })
    .throwOnError();

  res.status(HttpStatusCode.OK).json(contactFormData);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfParametersExistsMiddleware('body', ['email', 'fullName', 'message']),
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
