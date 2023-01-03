import { functionImportTest } from '@infrastructure/utils';

import { objectKeys } from './object-keys.function';

describe('objectKeys function', () => {
  functionImportTest(objectKeys);

  it('should return array of keys of object', () => {
    expect(objectKeys({ a: 1, b: 2 })).toEqual(['a', 'b']);
  });

  it('should return empty array if object is empty', () => {
    expect(objectKeys({})).toEqual([]);
  });
});
