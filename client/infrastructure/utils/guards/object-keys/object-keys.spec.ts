import { functionImportTest } from '@infrastructure/utils';

import { objectKeys } from './object-keys.function';

describe('objectKeys function', () => {
  functionImportTest(objectKeys);

  it.each([undefined, null, -500, [1, 2, 3], 'test'])(
    'should return empty array when provided parameter is not an object value',
    (_value) => {
      // @ts-expect-error
      expect(objectKeys(_value)).toEqual([]);
    },
  );

  it('should return array of keys of object', () => {
    expect(objectKeys({ a: 1, b: 2 })).toEqual(['a', 'b']);
  });

  it('should return empty array if object is empty', () => {
    expect(objectKeys({})).toEqual([]);
  });
});
