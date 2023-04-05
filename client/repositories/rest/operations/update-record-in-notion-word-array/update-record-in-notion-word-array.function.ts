import { findNotionWordById, findNotionWordIndexById } from '@domain/rest/operations';
import { INotionWord, IUpdatedNotionWord } from '@domain/rest/rest.types';

export const updateRecordInNotionWordArray = (
  words: INotionWord[],
  wordId: string,
  updatedNotionWord: IUpdatedNotionWord,
) => {
  const copiedNotionWords = [...words];

  const foundWord = findNotionWordById(copiedNotionWords, wordId);

  if (!foundWord) {
    return null;
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
