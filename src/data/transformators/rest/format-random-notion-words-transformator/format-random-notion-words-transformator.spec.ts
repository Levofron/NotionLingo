import { functionImportTest } from '@infrastructure/utils';

import { formatRandomNotionWordsTransformator } from './format-random-notion-words-transformator.function';

describe('formatRandomNotionWordsTransformator function', () => {
  functionImportTest(formatRandomNotionWordsTransformator);

  it('should return proper object', () => {
    const perfectObject = {
      word: 'Word',
      meaning: 'Meaning',
      exampleSentence: 'Example sentence',
    };

    const result = formatRandomNotionWordsTransformator([
      {
        word: 'word',
        meaning: 'meaning',
        exampleSentence: 'example Sentence',
      },
      {
        word: 'WORD',
        meaning: 'MEANING',
        exampleSentence: 'EXAMPLE SENTENCE',
      },
      perfectObject,
      {
        word: 'wOrD',
        meaning: 'mEaNiNg',
        exampleSentence: 'eXaMpLe sEnTeNcE',
      },
      {
        word: '        Word',
        meaning: 'Meaning        ',
        exampleSentence: 'Example sentence        ',
      },
      {
        word: '',
        // @ts-expect-error
        meaning: null,
        // @ts-expect-error
        exampleSentence: undefined,
      },
    ]);

    expect(result).toEqual([
      perfectObject,
      perfectObject,
      perfectObject,
      perfectObject,
      perfectObject,
      {
        word: '---',
        meaning: '---',
        exampleSentence: '---',
      },
    ]);
  });
});
