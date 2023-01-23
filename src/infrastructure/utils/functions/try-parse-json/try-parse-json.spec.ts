import { functionImportTest } from '@infrastructure/utils';

import { tryParseJson } from './try-parse-json.function';

describe('tryParseJson Function', () => {
  functionImportTest(tryParseJson);

  it('should return null when provided parameter is not a string value', () => {
    expect(tryParseJson('')).toBeNull();
    // @ts-ignore
    expect(tryParseJson(null)).toBeNull();
    // @ts-ignore
    expect(tryParseJson(undefined)).toBeNull();
  });

  it('should return object when passed parameter can be parsed', () => {
    const data = { test: 'test' };

    expect(tryParseJson(JSON.stringify(data))).toEqual(data);
  });
});
