import { INotionWord } from '@domain/rest/rest.models';

import { findNotionWordIndexById } from '../find-notion-word-index-by-id/find-notion-word-index-by-id.function';

export const removeNotionWordFromArray = (
  notionWords: INotionWord[],
  notionWordToRemove: INotionWord,
): INotionWord[] => {
  if (notionWords.length === 0) {
    return [];
  }

  const copiedArray = [...notionWords];
  const foundIndex = findNotionWordIndexById(copiedArray, notionWordToRemove.id);

  if (foundIndex === -1) {
    return copiedArray;
  }

  copiedArray.splice(foundIndex, 1);

  return copiedArray;
};
