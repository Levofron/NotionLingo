import { functionImportTest } from '@shared/functions';

import { textToIpa } from './text-to-ipa.function';

describe('textToIpa function', () => {
  functionImportTest(textToIpa);

  it.each([null, undefined, 0, 1, true, false, [], {}])(
    'should return null when word is %p',
    (word) => {
      expect(textToIpa(word as string)).toBeNull();
    },
  );

  it.each([
    ['brb.', null],
    ['world', 'wɚˈld'],
    ['I am', 'ajˈ æˈm'],
    ["Don't", 'dowˈnt or dowˈn'],
    ['hello', 'hʌlowˈ or hɛlowˈ'],
    ['hello world', 'hʌlowˈ wɚˈld'],
    ['Kill two birds with one stone', 'kɪˈl tuˈ bɚˈdz wɪˈð wʌˈn stowˈn'],
  ])('should return IPA for %p', (word, expected) => {
    expect(textToIpa(word)).toBe(expected);
  });
});
