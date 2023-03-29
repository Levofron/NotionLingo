import { INotionWord } from '@domain/rest/rest.types';

import { functionImportTest } from '@infrastructure/jest';

import { findNotionWordIndexById } from './find-notion-word-index-by-id.function';

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

describe('findNotionWordIndexById function', () => {
  functionImportTest(findNotionWordIndexById);

  it('should return undefined if no notion word is found', () => {
    const notionWords = [
      { ...notionWordMock, id: '1' },
      { ...notionWordMock, id: '2' },
    ];
    const notionWordId = '3';
    const result = findNotionWordIndexById(notionWords, notionWordId);

    expect(result).toEqual(-1);
  });

  it('should return the notion word if found', () => {
    const notionWords = [
      { ...notionWordMock, id: '1' },
      { ...notionWordMock, id: '2' },
    ];
    const notionWordId = '2';
    const result = findNotionWordIndexById(notionWords, notionWordId);

    expect(result).toEqual(1);
  });
});
