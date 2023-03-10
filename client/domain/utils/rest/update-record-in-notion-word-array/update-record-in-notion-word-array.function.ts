import { INotionWord, IUpdateNotionWordRequest } from '@domain/entities/rest.types';

import { findNotionWordById } from '../find-notion-word-by-id/find-notion-word-by-id.function';
import { findNotionWordIndexById } from '../find-notion-word-index-by-id/find-notion-word-index-by-id.function';

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

  console.log(updatedWord);
  copiedNotionWords[foundWordIndex] = updatedWord;

  return copiedNotionWords;
};
