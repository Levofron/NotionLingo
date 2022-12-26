import { functionImportTest } from '@infrastructure/utils';

import { createNotionClient } from './create-notion-client.function';

describe('createNotionClient function', () => {
  functionImportTest(createNotionClient);

  it('should return a Notion Client', () => {
    const token = 'token';
    const client = createNotionClient(token);

    const clientkeys = Object.keys(client);

    expect(clientkeys).toEqual(['blocks', 'databases', 'pages', 'users', 'comments', 'search']);
  });
});
