import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';

import {
  assignRequestTokenToSupabaseSessionMiddleware,
  decrypt,
  getNotionTableColumns,
  getProfileDataWithNotionDataCheck,
  getUserFromRequest,
  validatRoutesecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  validateRequestMethodMiddleware,
  withMiddleware,
} from '@server/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);
  const profileData = await getProfileDataWithNotionDataCheck(user?.id!);

  const hash = JSON.parse(profileData?.notion_api_key);
  const notionApiKey = decrypt(hash);

  const tableColumns = await getNotionTableColumns(notionApiKey, profileData.notion_database_id);

  return res.status(200).json(tableColumns);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validatRoutesecretMiddleware,
  validateIfUserIsLoggedInMiddleware,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
