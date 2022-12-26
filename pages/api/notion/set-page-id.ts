import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure/config';
import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  decrypt,
  getUserFromRequest,
  validateIfParametersExistsMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

const getProfileDetails = (userId: string) =>
  supabaseInstance
    .from('profiles')
    .select('notion_api_key,notion_page_id')
    .eq('id', userId)
    .single();

const updateProfileNotionApiKey = async (userId: string, newNotionPageId: string) =>
  supabaseInstance
    .from('profiles')
    .update({
      notion_page_id: newNotionPageId,
    })
    .eq('id', userId);

const getDatabasePages = async (pageId: string, hashAsString: string) => {
  const hash = JSON.parse(hashAsString);
  const notionApiKey = decrypt(hash);

  const notionClient = createNotionClient(notionApiKey);

  const { results: databasePages } = await notionClient.databases.query({
    database_id: pageId,
  });

  return databasePages;
};

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
    const { pageId } = req.body;

    const databasePages = await getDatabasePages(pageId, profileData.notion_api_key);

    if (databasePages.length === 0) {
      return res.status(500).json({ message: 'Your words database is empty' });
    }

    const { error: updateProfileError } = await updateProfileNotionApiKey(user?.id!, pageId);

    if (updateProfileError) {
      return res.status(500).json(updateProfileError);
    }

    return res.status(200).json(pageId);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateIfParametersExistsMiddleware('body', ['pageId']),
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
