import { INotionWord } from '@domain/entities/rest.types';

import { functionImportTest } from '@infrastructure/utils';

import { findNotionWordById } from './find-notion-word-by-id.function';

const notionWordMock: INotionWord = {
  id: 'id',
  ipa: 'ipa',
  word: 'word',
  type: 'type',
  meaning: 'meaning',
  imageUrl: 'imageUrl',
  exampleSentence: 'exampleSentence',
  meaningSuggestion: 'meaningSuggestion',
  exampleSentenceSuggestion: 'exampleSentenceSuggestion',
};

describe('findNotionWordById function', () => {
  functionImportTest(findNotionWordById);

  it('should return undefined if no notion word is found', () => {
    const notionWords = [
      { ...notionWordMock, id: '1' },
      { ...notionWordMock, id: '2' },
    ];
    const notionWordId = '3';
    const result = findNotionWordById(notionWords, notionWordId);

    expect(result).toBeUndefined();
  });

  it('should return the notion word if found', () => {
    const notionWords = [
      { ...notionWordMock, id: '1' },
      { ...notionWordMock, id: '2' },
    ];
    const notionWordId = '2';
    const result = findNotionWordById(notionWords, notionWordId);

    expect(result).toEqual(notionWords[1]);
  });
});
