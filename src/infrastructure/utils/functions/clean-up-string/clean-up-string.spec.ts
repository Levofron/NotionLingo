import { functionImportTest } from '@infrastructure/utils';

import { cleanUpString } from './clean-up-string.function';

describe('cleanUpString function', () => {
  functionImportTest(cleanUpString);

  it.each([
    null,
    undefined,
    0,
    1,
    true,
    false,
    [],
    {},
    () => {},
    Symbol('test'),
    new Date(),
    new Map(),
    new Set(),
    '',
    ' ',
    '  ',
  ])('should return empty string when input is %p', (_input) => {
    expect(cleanUpString(_input)).toBe('');
    expect(cleanUpString(_input, '---')).toBe('---');
  });

  it.each(['  test  ', '  TEST  ', '  Test  ', '  tEsT  '])(
    "should return capitalized string when input is '%s'",
    (_input) => {
      expect(cleanUpString(_input)).toBe('Test');
    },
  );

  it.each([
    '  t  e  s  t  ',
    '  T  E  S  T  ',
    '  T  e  S  t  ',
    '  t  E  s  T  ',
    '  t\n\re\ts\tt   ',
  ])("should return capitalized string without multiple spaces when input is '%s'", (_input) => {
    expect(cleanUpString(_input)).toBe('T e s t');
  });
});
