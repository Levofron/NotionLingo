import { IDictionaryResponse } from './dictionary-response-to-meaning-and-example-array.types';

export const dictionaryResponseToMeaningAndExampleArray = ({
  additionalExamples,
  meaningAndExamples,
  word,
}: IDictionaryResponse) => {
  const suggestions = meaningAndExamples
    .map((_meaningAndExample) => {
      if (!_meaningAndExample) {
        return null;
      }

      const { examples, meaning } = _meaningAndExample;

      const example = examples?.length ? examples[0] : additionalExamples[0] || '';

      if (!example || !meaning) {
        return null;
      }

      return {
        meaning,
        example,
      };
    })
    .filter(Boolean);

  return {
    word,
    suggestions: suggestions.slice(0, 10),
  };
};
