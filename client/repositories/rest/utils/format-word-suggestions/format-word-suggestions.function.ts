import { IWordSuggestions } from '@domain/entities/rest.types';

import { cleanUpString } from '@infrastructure/utils';

const cleanUpStrings = (strings: string[]) => strings.map((string) => cleanUpString(string));

export const formatWordSuggestions = ({
  additionalExamples,
  meaningAndExamples,
  word,
}: IWordSuggestions): IWordSuggestions => {
  const cleanedWord = cleanUpString(word);
  const cleanedAdditionalExamples = cleanUpStrings(additionalExamples);

  const cleanedMeaningsAndExamples = meaningAndExamples.map((_meaningAndExamples) => {
    const cleanedMeaning = cleanUpString(_meaningAndExamples.meaning);
    const cleanedExamples = cleanUpStrings(_meaningAndExamples.examples);

    return {
      meaning: cleanedMeaning,
      examples: cleanedExamples,
    };
  });

  return {
    word: cleanedWord,
    additionalExamples: cleanedAdditionalExamples,
    meaningAndExamples: cleanedMeaningsAndExamples,
  };
};
