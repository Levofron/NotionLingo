import { functionImportTest, isFunction } from '@utils';

describe('isFunction function', () => {
  functionImportTest(isFunction);

  it('should return false when provided parameter is not a function', () => {
    // @ts-expect-error
    expect(isFunction()).toBeFalsy();
    expect(isFunction({})).toBeFalsy();
    expect(isFunction(null)).toBeFalsy();
    expect(isFunction('A123')).toBeFalsy();
    expect(isFunction([1, 2, 3])).toBeFalsy();
    expect(isFunction(new Date())).toBeFalsy();
  });

  it('should return true when provided parameter is a function', () => {
    expect(isFunction(() => {})).toBeTruthy();
    expect(isFunction(jest.fn())).toBeTruthy();
  });
});
