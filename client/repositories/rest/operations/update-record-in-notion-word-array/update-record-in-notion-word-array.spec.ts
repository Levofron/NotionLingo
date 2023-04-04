import { INotionWord } from '@domain/rest/rest.types';

import { functionImportTest } from '@infrastructure/functions';

import { updateRecordInNotionWordArray } from './update-record-in-notion-word-array.function';

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

describe('updateRecordInNotionWordArray function', () => {
  functionImportTest(updateRecordInNotionWordArray);

  it('should return undefined if no notion word is found', () => {
    const notionWords = [
      { ...notionWordMock, id: '1' },
      { ...notionWordMock, id: '2' },
    ];
    const result = updateRecordInNotionWordArray(notionWords, 'id', { id: 'id' });

    expect(result).toBeNull();
  });

  it('should return updated array if notion word is found', () => {
    const notionWords = [
      { ...notionWordMock, id: '1' },
      { ...notionWordMock, id: '2' },
    ];
    const result = updateRecordInNotionWordArray(notionWords, '2', {
      id: '2',
      exampleSentence: '213',
      meaning: '123',
    });

    expect(result).toEqual([
      { ...notionWordMock, id: '1' },
      { ...notionWordMock, id: '2', meaning: '123', exampleSentence: '213' },
    ]);
  });
});
