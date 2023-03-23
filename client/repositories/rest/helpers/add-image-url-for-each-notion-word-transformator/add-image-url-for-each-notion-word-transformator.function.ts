import { INotionWordResponseRecord } from '@api/rest/rest.types';

import { INotionWord } from '@domain/rest/rest.types';

import { UNSPLASH_BASE_URL } from '@config/constants';

export const addImageUrlForEachNotionWordTransformator = (
  randomNotionWords: INotionWordResponseRecord[],
): INotionWord[] =>
  randomNotionWords.map((_notionWord) => {
    const wordToSearch = _notionWord.word.replace(/ /g, '+');
    const imageUrl = `${UNSPLASH_BASE_URL}${wordToSearch}`;

    return {
      imageUrl,
      ..._notionWord,
    };
  });
