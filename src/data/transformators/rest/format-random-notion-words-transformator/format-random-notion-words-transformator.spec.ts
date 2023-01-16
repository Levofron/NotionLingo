import { functionImportTest } from '@infrastructure/utils';

import { formatRandomNotionWordsTransformator } from './format-random-notion-words-transformator.function';

describe('formatRandomNotionWordsTransformator function', () => {
  functionImportTest(formatRandomNotionWordsTransformator);

  it('should return proper object', () => {
    const perfectObject = {
      ipa: 'ipa',
      word: 'Word',
      meaning: 'Meaning',
      type: ['Type', 'Type2'],
      exampleSentence: 'Example sentence',
    };

    const result = formatRandomNotionWordsTransformator([
      {
        ipa: 'ipa',
        type: null,
        word: 'word',
        meaning: 'meaning',
        exampleSentence: 'example Sentence',
      },
      {
        ipa: 'ipa',
        type: 'TYPE',
        word: 'WORD',
        meaning: 'MEANING',
        exampleSentence: 'EXAMPLE SENTENCE',
      },
      perfectObject,
      {
        ipa: 'ipa',
        word: 'wOrD',
        meaning: 'mEaNiNg',
        type: ['type', 'type2'],
        exampleSentence: 'eXaMpLe sEnTeNcE',
      },
      {
        ipa: 'ipa',
        word: '        Word',
        meaning: 'Meaning        ',
        type: ['        Type', '        Type2'],
        exampleSentence: 'Example sentence        ',
      },
      {
        type: '',
        word: '',
        ipa: 'ipa',
        // @ts-expect-error
        meaning: null,
        // @ts-expect-error
        exampleSentence: undefined,
      },
    ]);

    expect(result).toEqual([
      {
        ipa: 'ipa',
        type: '---',
        word: 'Word',
        meaning: 'Meaning',
        exampleSentence: 'Example sentence',
      },
      {
        ipa: 'ipa',
        type: 'Type',
        word: 'Word',
        meaning: 'Meaning',
        exampleSentence: 'Example sentence',
      },
      perfectObject,
      {
        ipa: 'ipa',
        word: 'Word',
        meaning: 'Meaning',
        type: ['Type', 'Type2'],
        exampleSentence: 'Example sentence',
      },
      {
        ipa: 'ipa',
        word: 'Word',
        meaning: 'Meaning',
        type: ['Type', 'Type2'],
        exampleSentence: 'Example sentence',
      },
      {
        ipa: 'ipa',
        type: '---',
        word: '---',
        meaning: '---',
        exampleSentence: '---',
      },
    ]);
  });
});
