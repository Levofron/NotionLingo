import { functionImportTest } from '@infrastructure/utils';

import { formatRandomNotionWordsTransformator } from './format-random-notion-words-transformator.function';

describe('formatRandomNotionWordsTransformator function', () => {
  functionImportTest(formatRandomNotionWordsTransformator);

  it('should return proper object', () => {
    const perfectObject = {
      word: 'Word',
      meaning: 'Meaning',
      type: ['Type', 'Type2'],
      exampleSentence: 'Example sentence',
    };

    const result = formatRandomNotionWordsTransformator([
      {
        type: null,
        word: 'word',
        meaning: 'meaning',
        exampleSentence: 'example Sentence',
      },
      {
        type: 'TYPE',
        word: 'WORD',
        meaning: 'MEANING',
        exampleSentence: 'EXAMPLE SENTENCE',
      },
      perfectObject,
      {
        word: 'wOrD',
        meaning: 'mEaNiNg',
        type: ['type', 'type2'],
        exampleSentence: 'eXaMpLe sEnTeNcE',
      },
      {
        word: '        Word',
        meaning: 'Meaning        ',
        type: ['        Type', '        Type2'],
        exampleSentence: 'Example sentence        ',
      },
      {
        type: '',
        word: '',
        // @ts-expect-error
        meaning: null,
        // @ts-expect-error
        exampleSentence: undefined,
      },
    ]);

    expect(result).toEqual([
      {
        type: '---',
        word: 'Word',
        meaning: 'Meaning',
        exampleSentence: 'Example sentence',
      },
      {
        type: 'Type',
        word: 'Word',
        meaning: 'Meaning',
        exampleSentence: 'Example sentence',
      },
      perfectObject,
      {
        word: 'Word',
        meaning: 'Meaning',
        type: ['Type', 'Type2'],
        exampleSentence: 'Example sentence',
      },
      {
        word: 'Word',
        meaning: 'Meaning',
        type: ['Type', 'Type2'],
        exampleSentence: 'Example sentence',
      },
      {
        type: '---',
        word: '---',
        meaning: '---',
        exampleSentence: '---',
      },
    ]);
  });
});
