import { functionImportTest } from '@infrastructure/utils';

import { isIsoDate } from './is-iso-date.function';

describe('isIsoDate function', () => {
  functionImportTest(isIsoDate);

  it('should return true if string is valid ISO date', () => {
    expect(isIsoDate('2021-07-20T19:00:00.000Z')).toBeTruthy();
  });

  it('should return false if string is not valid ISO date', () => {
    expect(isIsoDate('2021-07-20')).toBeFalsy();
  });
});
