import { functionImportTest } from '@infrastructure/utils';

import { hasOwnProperty } from './has-own-property.function';

describe('hasOwnProperty function', () => {
  functionImportTest(hasOwnProperty);

  it('should return true when object has property', () => {
    const object = {
      foo: 'bar',
    };

    expect(hasOwnProperty(object, 'foo')).toBe(true);
  });

  it('should return false when object does not have property', () => {
    const object = {
      foo: 'bar',
    };

    expect(hasOwnProperty(object, 'bar')).toBe(false);
  });
});
