import { functionImportTest } from '@infrastructure/utils';

import { capitalizeFirstLetter } from './capitalize-first-letter.function';

describe('capitalizeFirstLetter function', () => {
  functionImportTest(capitalizeFirstLetter);

  it('should capitalize first letter of string', () => {
    expect(capitalizeFirstLetter('string')).toBe('String');
  });

  it('should return empty string if string is empty', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });
});
