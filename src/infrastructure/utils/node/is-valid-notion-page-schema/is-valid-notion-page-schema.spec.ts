import { functionImportTest } from '@infrastructure/utils';

import { isValidNotionPageSchema } from './is-valid-notion-page-schema.function';

describe('isValidNotionPageSchema function', () => {
  functionImportTest(isValidNotionPageSchema);

  it('should return true if page properties are valid', () => {
    const result = isValidNotionPageSchema({
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

  it('should return false if page properties are invalid', () => {
    const result = isValidNotionPageSchema({
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
