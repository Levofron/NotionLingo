import { INotionWord, IUpdateNotionWordRequest } from '@domain/rest/rest.types';

import { findNotionWordById, findNotionWordIndexById } from '..';

export const updateRecordInNotionWordArray = (
  notionWords: INotionWord[],
  notionWordId: string,
  updatedNotionWord: IUpdateNotionWordRequest,
) => {
  const copiedNotionWords = [...notionWords];

  const foundWord = findNotionWordById(copiedNotionWords, notionWordId);

  if (!foundWord) {
    return;
  }

  const foundWordIndex = findNotionWordIndexById(copiedNotionWords, foundWord.id);

  const updatedWord: INotionWord = {
    ...foundWord,
    meaning: updatedNotionWord.meaning || foundWord.meaning,
    exampleSentence: updatedNotionWord.exampleSentence || foundWord.exampleSentence,
  };

  copiedNotionWords[foundWordIndex] = updatedWord;

  return copiedNotionWords;
};
