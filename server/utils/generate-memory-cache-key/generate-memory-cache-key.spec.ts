import { functionImportTest } from '@infrastructure/jest';

import { generateMemoryCacheKey } from './generate-memory-cache-key.function';

describe('generateMemoryCacheKey function', () => {
  functionImportTest(generateMemoryCacheKey);

  it('should return a string', () => {
    const userId = 'userId';
    const notionApiKey = 'notionApiKey';
    const notionDatabaseId = 'notionDatabaseId';

    const result = generateMemoryCacheKey(userId, notionDatabaseId, notionApiKey);

    expect(typeof result).toBe('string');

    expect(result).toBe(
      JSON.stringify({
        userId,
        notionApiKey,
        notionDatabaseId,
      }),
    );
  });
});
