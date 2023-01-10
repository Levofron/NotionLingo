import { functionImportTest } from '@infrastructure/utils';

import { filterOutObjectKeys } from './filter-out-object-keys.function';

describe('filterOutObjectKeys function', () => {
  functionImportTest(filterOutObjectKeys);

  it.each([undefined, null, -500, [1, 2, 3], 'test'])(
    'should return null when provided parameter is not an object value',
    (_value) => {
      // @ts-expect-error
      expect(filterOutObjectKeys(_value, 'a')).toBeNull();
    },
  );

  it('should return null when provided keys array is empty', () => {
    expect(filterOutObjectKeys({ a: 1, b: 2 }, [])).toBeNull();
  });

  it('should filter out provided keys from object', () => {
    expect(filterOutObjectKeys({ a: 1, b: 2 }, ['a'])).toEqual({ b: 2 });
  });
});
