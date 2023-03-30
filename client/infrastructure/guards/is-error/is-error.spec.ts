import { functionImportTest } from '@infrastructure/functions';

import { isError } from './is-error.function';

describe('isError function', () => {
  functionImportTest(isError);

  test('should return true when called with an Error', () => {
    expect(isError(new Error('mesage'))).toBeTruthy();
  });

  it.each([undefined, null, -500, [1, 2, 3], {}, new Date()])(
    'should return false when called with not an Error',
    (value) => {
      expect(isError(value)).toBeFalsy();
    },
  );
});
