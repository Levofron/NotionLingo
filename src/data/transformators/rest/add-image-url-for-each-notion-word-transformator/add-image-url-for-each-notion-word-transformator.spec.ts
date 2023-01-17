import { INotionWordResponseItem } from '@data/responses.types';

import { functionImportTest } from '@infrastructure/utils';

import { addImageUrlForEachNotionWordTransformator } from './add-image-url-for-each-notion-word-transformator.function';

describe('addImageUrlForEachNotionWordTransformator function', () => {
  functionImportTest(addImageUrlForEachNotionWordTransformator);

  it('should return proper object', () => {
    const randomNotionWordsMock: INotionWordResponseItem[] = [
      {
        ipa: 'ipa',
        type: 'type',
        word: 'word',
        meaning: 'meaning',
        exampleSentence: 'example sentence',
      },
    ];

    const result = addImageUrlForEachNotionWordTransformator(randomNotionWordsMock);

    expect(result).toEqual([
      {
        ipa: 'ipa',
        type: 'type',
        word: 'word',
        meaning: 'meaning',
        exampleSentence: 'example sentence',
        imageUrl: 'https://api.unsplash.com/search/photos?query=word',
      },
    ]);
  });
});
