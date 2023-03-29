import { functionImportTest } from '@infrastructure/jest';

import { isValidNotionDatabaseSchema } from './is-valid-notion-database-schema.function';

describe('isValidNotionDatabaseSchema function', () => {
  functionImportTest(isValidNotionDatabaseSchema);

  it('should return true if database properties are valid', () => {
    const result = isValidNotionDatabaseSchema({
      Word: {
        type: 'title',
        name: 'Word',
      },
      Meaning: {
        type: 'rich_text',
        name: 'Meaning',
      },
      'Example sentence': {
        type: 'rich_text',
        name: 'Example sentence',
      },
    });

    expect(result).toBeTruthy();
  });

  it('should return false if database properties are invalid', () => {
    const result = isValidNotionDatabaseSchema({
      Word: {
        type: 'title',
        name: 'Word',
      },
      Meaning: {
        type: 'rich_text',
        name: 'Meaning',
      },
      'Example sentence 2': {
        type: 'rich_text',
        name: 'Example sentence 2',
      },
    });

    expect(result).toBeFalsy();
  });
});
