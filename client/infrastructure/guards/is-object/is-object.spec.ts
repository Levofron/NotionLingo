import { functionImportTest } from '@infrastructure/functions';

import { isObject } from './is-object.function';

describe('isObject function', () => {
  functionImportTest(isObject);

  it.each([undefined, null, -500, [1, 2, 3], 'test'])(
    'should return false when provided parameter is not an object value',
    (_value) => {
      expect(isObject(_value)).toBeFalsy();
    },
  );

  it.each([{}, new Date()])(
    'should return true when provided parameter is an object value',
    (_value) => {
      expect(isObject(_value)).toBeTruthy();
    },
  );
});
