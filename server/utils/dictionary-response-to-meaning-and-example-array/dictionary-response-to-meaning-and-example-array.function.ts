import { IDictionaryResponse } from './dictionary-response-to-meaning-and-example-array.types';

export const dictionaryResponseToMeaningAndExampleArray = ({
  additionalExamples,
  meaningAndExamples,
  word,
}: IDictionaryResponse) => {
  const suggestions = meaningAndExamples
    .map(({ examples, meaning }) => {
      const example = examples?.length ? examples[0] : additionalExamples[0] || '';

      if (!example) {
        return null;
      }

      return {
        meaning,
        example: examples?.length ? examples[0] : additionalExamples[0] || '',
      };
    })
    .filter(Boolean);

  return {
    word,
    suggestions: suggestions.slice(0, 10),
  };
};
