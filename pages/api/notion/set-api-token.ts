import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure/config';
import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  encrypt,
  getUserFromRequest,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

const updateProfileNotionApiKey = async (userId: string, newNotionApiKey: string) =>
  supabaseInstance
    .from('profiles')
    .update({
      notion_page_id: null,
      notion_api_key: newNotionApiKey,
    })
    .throwOnError()
    .eq('id', userId);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body;

  const user = await getUserFromRequest(req);
  const notionClient = createNotionClient(token);

  await notionClient.search({
    query: '84ff1e57-2170-486b-8d31-e163c9069538',
  });

  const hash = encrypt(token);
  const hashAsString = JSON.stringify(hash);

  await updateProfileNotionApiKey(user?.id!, hashAsString);

  return res.status(EHttpStatusCode.OK).json(hash);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateIfParametersExistsMiddleware('body', ['token']),
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
