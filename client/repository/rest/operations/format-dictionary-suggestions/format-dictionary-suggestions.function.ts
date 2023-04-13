import { IDictionarySuggestions } from '@domain/rest/rest.models';

import { cleanUpString } from '@shared/functions';

export const formatDictionarySuggestions = ({
  suggestions,
  word,
}: IDictionarySuggestions): IDictionarySuggestions => {
  const cleanedWord = cleanUpString(word);

  const cleanedSuggestions = suggestions.map((_suggestion) => {
    const cleanedMeaning = cleanUpString(_suggestion.meaning);
    const cleanedExample = cleanUpString(_suggestion.example);

    return {
      meaning: cleanedMeaning,
      example: cleanedExample,
    };
  });

  return {
    word: cleanedWord,
    suggestions: cleanedSuggestions,
  };
};
