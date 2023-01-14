import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure/config';
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
  supabaseInstance.from('profiles').select('notion_api_key').eq('id', userId).single();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  const { data: profileData, error: profileError } = await getProfileDetails(user?.id!);

  if (profileError) {
    return res.status(500).json(profileError);
  }

  if (!profileData.notion_api_key) {
    return res.status(500).json({ message: 'The user does not have a notion api key' });
  }

  try {
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
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json(error);
  }
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
