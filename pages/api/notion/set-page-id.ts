import { NextApiRequest, NextApiResponse } from 'next';

import {
  decrypt,
  withMiddleware,
  createNotionClient,
  getUserFromRequest,
  validateIfUserIsLoggedIn,
  validateIfParametersExists,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
} from '../utils';

import { supabaseInstance } from '@infrastructure';

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

  const { data: profilesData, error: profilesError } = await getProfileDetails(user?.id!);

  if (profilesError) {
    return res.status(500).json(profilesError);
  }

  if (profilesData.notion_page_id) {
    return res
      .status(500)
      .json({ message: 'You have already chosen from which page you want to download data' });
  }

  try {
    const { pageId } = req.body;

    const databasePages = await getDatabasePages(pageId, profilesData.notion_api_key);

    if (databasePages.length === 0) {
      return res.status(500).json({ message: 'Your words database is empty' });
    }

    const { error: updateProfileError } = await updateProfileNotionApiKey(user?.id!, pageId);

    if (updateProfileError) {
      return res.status(500).json(updateProfileError);
    }

    return res.status(200).json({ pageId });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedIn,
  validateIfParametersExists('body', ['pageId']),
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
