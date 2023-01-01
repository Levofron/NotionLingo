import { functionImportTest } from '@infrastructure/utils';

import { isAxiosError } from './is-axios-error.function';

describe('isAxiosError function', () => {
  functionImportTest(isAxiosError);

  it('should return true when error is an axios error', () => {
    const error = {
      isAxiosError: true,
    };

    expect(isAxiosError(error)).toBe(true);
  });

  it.each([
    undefined,
    null,
    {},
    { isAxiosError: undefined },
    { isAxiosError: null },
    { isAxiosError: {} },
    { isAxiosError: [] },
    { isAxiosError: 'true' },
    { isAxiosError: 'false' },
    { isAxiosError: 0 },
    { isAxiosError: 1 },
    { isAxiosError: false },
  ])('should return false when error is %p', (error) => {
    expect(isAxiosError(error)).toBe(false);
  });
});
