import { functionImportTest } from '@infrastructure/utils';

import { isPromise } from './is-promise.function';

describe('isPromise function', () => {
  functionImportTest(isPromise);

  it('should return true if the value is a promise', () => {
    expect(isPromise(Promise.resolve())).toBe(true);
  });

  it('should return false if the value is not a promise', () => {
    expect(isPromise({})).toBe(false);
  });
});
