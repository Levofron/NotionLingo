import { functionImportTest } from '@infrastructure/utils';

import { dictionaryResponseToMeaningAndExampleArray } from './dictionary-response-to-meaning-and-example-array.function';

describe('dictionaryResponseToMeaningAndExampleArray function', () => {
  functionImportTest(dictionaryResponseToMeaningAndExampleArray);

  it('should return same object with cleaned up strings', () => {
    const data = {
      additionalExamples: ['example 3', 'example 24'],
      meaningAndExamples: [
        {
          meaning: 'meaning 1',
          examples: ['example 1', 'example 2'],
        },
        {
          meaning: 'meaning 2',
          examples: ['example 1', 'example 2'],
        },
        {
          examples: [],
          meaning: 'meaning 3',
        },
      ],
      word: 'word',
    };

    const response = dictionaryResponseToMeaningAndExampleArray(data);

    expect(response).toMatchSnapshot();
  });
});
