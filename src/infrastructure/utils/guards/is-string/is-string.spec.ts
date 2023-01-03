import { functionImportTest } from '@infrastructure/utils';

import { isString } from './is-string.function';

describe('isString function', () => {
  functionImportTest(isString);

  it.each([undefined, null, -500, [1, 2, 3], {}, new Date()])(
    'should return false when provided parameter is not a string value',
    (value) => {
      expect(isString(value)).toBeFalsy();
    },
  );

  it.each(['', '123', String('test')])(
    'should return true when provided parameter is a string value',
    (value) => {
      expect(isString(value)).toBeTruthy();
    },
  );
});
