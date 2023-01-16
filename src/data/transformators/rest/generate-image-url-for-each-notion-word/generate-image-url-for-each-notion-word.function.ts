import { INotionWord } from '@domain/rest/rest.models';

import { INotionWordResponseItem } from '@data/responses.types';

export const generateImageUrlForEachNotionWord = (
  randomNotionWords: INotionWordResponseItem[],
): INotionWord[] =>
  randomNotionWords.map((_notionWord) => {
    const wordToSearch = _notionWord.word.replace(/ /g, '+');
    const imageUrl = `https://source.unsplash.com/500x300/?${wordToSearch}`;

    return {
      imageUrl,
      ..._notionWord,
    };
  });
