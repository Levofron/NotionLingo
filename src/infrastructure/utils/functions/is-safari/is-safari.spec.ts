import { functionImportTest } from '@infrastructure/utils';

import { isSafari } from './is-safari.function';

describe('isSafari function', () => {
  functionImportTest(isSafari);

  it('should return true if the user agent is Safari', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Safari',
      writable: true,
    });

    expect(isSafari()).toBeTruthy();
  });

  it('should return false if the user agent is not Safari', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Chrome',
      writable: true,
    });

    expect(isSafari()).toBeFalsy();
  });
});
