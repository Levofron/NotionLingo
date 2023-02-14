import { functionImportTest } from '@infrastructure/utils';

import { formatWordSuggestions } from './format-word-suggestions.function';

describe('formatWordSuggestions function', () => {
  functionImportTest(formatWordSuggestions);

  it('should return same object with cleaned up strings', () => {
    const wordSuggestions = {
      additionalExamples: ['example 1', 'example 2'],
      meaningAndExamples: [
        {
          meaning: 'meaning 1',
          examples: ['example 1', 'example 2'],
        },
        {
          meaning: 'meaning 2',
          examples: ['example 1', 'example 2'],
        },
      ],
      word: 'word',
    };

    const formattedWordSuggestions = formatWordSuggestions(wordSuggestions);

    expect(formattedWordSuggestions).toEqual({
      additionalExamples: ['Example 1', 'example 2'],
      meaningAndExamples: [
        {
          meaning: 'Meaning 1',
          examples: ['Example 1', 'Example 2'],
        },
        {
          meaning: 'Meaning 2',
          examples: ['Example 1', 'Example 2'],
        },
      ],
      word: 'Word',
    });
  });
});
