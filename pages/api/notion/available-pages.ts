import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { supabaseInstance } from '@infrastructure/config';
import { EHttpStatusCode } from '@infrastructure/types/http-status-code';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  decrypt,
  getUserFromRequest,
  isValidNotionPageSchema,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

const getProfileDetails = (userId: string) =>
  supabaseInstance
    .from('profiles')
    .select('notion_api_key')
    .eq('id', userId)
    .throwOnError()
    .single();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);
  const { data: profileData } = await getProfileDetails(user?.id!);

  if (!profileData.notion_api_key) {
    throw new ApiError(
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      'The user does not have a notion api key',
    );
  }

  const hash = JSON.parse(profileData.notion_api_key);
  const notionApiKey = decrypt(hash);

  const notionClient = createNotionClient(notionApiKey);

  const { results: availablePages } = await notionClient.search({
    filter: { value: 'database', property: 'object' },
  });

  const filteredAvailablePages = (availablePages as DatabaseObjectResponse[]).filter(
    (_availablePage) => isValidNotionPageSchema(_availablePage.properties),
  );

  const parsedAvailablePages = filteredAvailablePages.map((_page) => ({
    id: _page.id,
    url: _page.url,
    createdTime: _page.created_time,
    title: _page.title[0].plain_text,
    lastEditedTime: _page.last_edited_time,
  }));

  return res.status(200).json(parsedAvailablePages);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
