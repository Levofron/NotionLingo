import { functionImportTest } from '@shared/functions';

import { isBoolean } from './is-boolean.function';

describe('isBoolean function', () => {
  functionImportTest(isBoolean);

  it('should return false when provided parameter is not a boolean value', () => {
    // @ts-expect-error
    expect(isBoolean()).toBeFalsy();
    expect(isBoolean({})).toBeFalsy();
    expect(isBoolean(null)).toBeFalsy();
    expect(isBoolean(-500)).toBeFalsy();
    expect(isBoolean([1, 2, 3])).toBeFalsy();
    expect(isBoolean(new Date())).toBeFalsy();
  });

  it('should return true when provided parameter is a boolean value', () => {
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean(false)).toBeTruthy();
    expect(isBoolean(Boolean(1))).toBeTruthy();
  });
});
