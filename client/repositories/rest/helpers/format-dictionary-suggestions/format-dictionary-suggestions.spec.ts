import { functionImportTest } from '@infrastructure/functions';

import { formatDictionarySuggestions } from './format-dictionary-suggestions.function';

describe('formatDictionarySuggestions function', () => {
  functionImportTest(formatDictionarySuggestions);

  it('should return same object with cleaned up strings', () => {
    const data = {
      suggestions: [
        {
          meaning: 'meaning 1',
          example: 'example 1',
        },
        {
          meaning: 'meaning 2',
          example: 'example 1',
        },
      ],
      word: 'word',
    };

    const formattedSuggestions = formatDictionarySuggestions(data);

    expect(formattedSuggestions).toMatchSnapshot();
  });
});
