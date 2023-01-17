import { INotionWord } from '@domain/rest/rest.models';

import { INotionWordResponseItem } from '@data/responses.types';

import { UNSPLASH_BASE_URL } from '@constants';

export const addImageUrlForEachNotionWordTransformator = (
  randomNotionWords: INotionWordResponseItem[],
): INotionWord[] =>
  randomNotionWords.map((_notionWord) => {
    const wordToSearch = _notionWord.word.replace(/ /g, '+');
    const imageUrl = `${UNSPLASH_BASE_URL}${wordToSearch}`;

    return {
      imageUrl,
      ..._notionWord,
    };
  });
