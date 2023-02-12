import { INotionWordResponseRecord } from '@api/rest/rest.types';

import { functionImportTest } from '@infrastructure/utils';

import { addImageUrlForEachNotionWordTransformator } from './add-image-url-for-each-notion-word-transformator.function';

describe('addImageUrlForEachNotionWordTransformator function', () => {
  functionImportTest(addImageUrlForEachNotionWordTransformator);

  it('should return proper object', () => {
    const randomNotionWordsMock: INotionWordResponseRecord[] = [
      {
        id: 'id',
        ipa: 'ipa',
        type: 'type',
        word: 'word',
        meaning: 'meaning',
        exampleSentence: 'example sentence',
        meaningSuggestion: 'meaning suggestion',
        exampleSentenceSuggestion: 'example sentence suggestion',
      },
    ];

    const result = addImageUrlForEachNotionWordTransformator(randomNotionWordsMock);

    expect(result).toEqual([
      {
        id: 'id',
        ipa: 'ipa',
        type: 'type',
        word: 'word',
        meaning: 'meaning',
        exampleSentence: 'example sentence',
        meaningSuggestion: 'meaning suggestion',
        exampleSentenceSuggestion: 'example sentence suggestion',
        imageUrl: 'https://api.unsplash.com/search/photos?query=word',
      },
    ]);
  });
});
