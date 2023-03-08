import { IDictionaryResponse } from './dictionary-response-to-meaning-and-example-array.types';

export const dictionaryResponseToMeaningAndExampleArray = ({
  additionalExamples,
  meaningAndExamples,
  word,
}: IDictionaryResponse) => {
  const suggestions = meaningAndExamples.map(({ examples, meaning }) => ({
    meaning,
    example: examples?.length ? examples[0] : additionalExamples[0] || '',
  }));

  return {
    word,
    suggestions,
  };
};
