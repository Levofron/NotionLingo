import { INotionWord } from '@domain/entities/rest.types';

export const removeNotionWordFromArray = (
  notionWords: INotionWord[],
  notionWordToRemove: INotionWord,
): INotionWord[] => {
  if (notionWords.length === 0) {
    return [];
  }

  const copiedArray = [...notionWords];
  const foundIndex = copiedArray.findIndex((notionWord) => notionWord.id === notionWordToRemove.id);

  if (foundIndex === -1) {
    return copiedArray;
  }

  copiedArray.splice(foundIndex, 1);

  return copiedArray;
};
