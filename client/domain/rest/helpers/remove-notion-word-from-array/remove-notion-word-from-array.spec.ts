import { INotionWord } from '@domain/rest/rest.types';

import { functionImportTest } from '@infrastructure/utils';

import { removeNotionWordFromArray } from './remove-notion-word-from-array.function';

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

describe('removeNotionWordFromArray function', () => {
  functionImportTest(removeNotionWordFromArray);

  it('should return empty array if passed empty array', () => {
    expect(removeNotionWordFromArray([], notionWordMock)).toEqual([]);
  });

  it('should return empty array if passed array with one element and it is the same as passed notion word', () => {
    expect(removeNotionWordFromArray([notionWordMock], notionWordMock)).toEqual([]);
  });

  it('should return array with one element if passed array with one element and it is not the same as passed notion word', () => {
    expect(removeNotionWordFromArray([notionWordMock], { ...notionWordMock, id: 'id2' })).toEqual([
      notionWordMock,
    ]);
  });
});
