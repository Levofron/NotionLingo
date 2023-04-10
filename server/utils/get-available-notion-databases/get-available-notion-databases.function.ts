import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { createNotionClient } from '../create-notion-client/create-notion-client.function';

export const getAvailableNotionDatabases = async (notionApiKey: string) => {
  const notionClient = createNotionClient(notionApiKey);

  const { results: availableDatabases = [] } = await notionClient.search({
    filter: { value: 'database', property: 'object' },
  });

  return availableDatabases as DatabaseObjectResponse[];
};
