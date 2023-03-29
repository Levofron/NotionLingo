import { functionImportTest } from '@infrastructure/jest';

import { formatRandomNotionWordsTransformator } from './format-random-notion-words-transformator.function';

describe('formatRandomNotionWordsTransformator function', () => {
  functionImportTest(formatRandomNotionWordsTransformator);

  it('should return proper object', () => {
    const perfectObject = {
      id: 'id',
      ipa: 'ipa',
      word: 'Word',
      meaning: 'Meaning',
      type: ['Type', 'Type2'],
      exampleSentence: 'Example sentence',
      meaningSuggestion: 'Meaning suggestion',
      exampleSentenceSuggestion: 'Example sentence suggestion',
    };

    const result = formatRandomNotionWordsTransformator([
      {
        id: 'id',
        ipa: 'ipa',
        type: null,
        word: 'word',
        meaning: 'meaning',
        exampleSentence: 'example Sentence',
        meaningSuggestion: 'meaning suggestion',
        exampleSentenceSuggestion: 'example sentence suggestion',
      },
      {
        id: 'id',
        ipa: 'ipa',
        type: 'TYPE',
        word: 'WORD',
        meaning: 'MEANING',
        exampleSentence: 'EXAMPLE SENTENCE',
        meaningSuggestion: 'MEANING SUGGESTION',
        exampleSentenceSuggestion: 'EXAMPLE SENTENCE SUGGESTION',
      },
      perfectObject,
      {
        id: 'id',
        ipa: 'ipa',
        word: 'wOrD',
        meaning: 'mEaNiNg',
        type: ['type', 'type2'],
        exampleSentence: 'eXaMpLe sEnTeNcE',
        meaningSuggestion: 'mEaNiNg sUgGeStIoN',
        exampleSentenceSuggestion: 'eXaMpLe sEnTeNcE sUgGeStIoN',
      },
      {
        id: 'id',
        ipa: 'ipa',
        word: '        Word',
        meaning: 'Meaning        ',
        type: ['        Type', '        Type2'],
        exampleSentence: 'Example sentence        ',
        meaningSuggestion: '        Meaning suggestion',
        exampleSentenceSuggestion: '        Example sentence suggestion',
      },
      {
        id: '',
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
        id: 'id',
        ipa: 'ipa',
        type: '---',
        word: 'Word',
        meaning: 'Meaning',
        exampleSentence: 'Example sentence',
        meaningSuggestion: 'Meaning suggestion',
        exampleSentenceSuggestion: 'Example sentence suggestion',
      },
      {
        id: 'id',
        ipa: 'ipa',
        type: 'Type',
        word: 'Word',
        meaning: 'Meaning',
        exampleSentence: 'Example sentence',
        meaningSuggestion: 'Meaning suggestion',
        exampleSentenceSuggestion: 'Example sentence suggestion',
      },
      perfectObject,
      {
        id: 'id',
        ipa: 'ipa',
        word: 'Word',
        meaning: 'Meaning',
        type: ['Type', 'Type2'],
        exampleSentence: 'Example sentence',
        meaningSuggestion: 'Meaning suggestion',
        exampleSentenceSuggestion: 'Example sentence suggestion',
      },
      {
        id: 'id',
        ipa: 'ipa',
        word: 'Word',
        meaning: 'Meaning',
        type: ['Type', 'Type2'],
        exampleSentence: 'Example sentence',
        meaningSuggestion: 'Meaning suggestion',
        exampleSentenceSuggestion: 'Example sentence suggestion',
      },
      {
        id: '',
        type: '---',
        word: '---',
        ipa: 'ipa',
        meaning: '---',
        exampleSentence: '---',
      },
    ]);
  });
});
