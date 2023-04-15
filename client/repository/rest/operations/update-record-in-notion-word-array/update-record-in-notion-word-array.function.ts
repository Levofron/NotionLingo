import { findNotionWordById, findNotionWordIndexById } from '@domain/rest/operations';
import { NotionWord, UpdatedNotionWord } from '@domain/rest/rest.models';

export const updateRecordInNotionWordArray = (
  words: NotionWord[],
  wordId: string,
  updatedNotionWord: UpdatedNotionWord,
) => {
  const copiedNotionWords = [...words];

  const foundWord = findNotionWordById(copiedNotionWords, wordId);

  if (!foundWord) {
    return null;
  }

  const foundWordIndex = findNotionWordIndexById(copiedNotionWords, foundWord.id);

  const updatedWord: NotionWord = {
    ...foundWord,
    meaning: updatedNotionWord.meaning || foundWord.meaning,
    exampleSentence: updatedNotionWord.exampleSentence || foundWord.exampleSentence,
  };

  copiedNotionWords[foundWordIndex] = updatedWord;

  return copiedNotionWords;
};
