import { NotionWordResponseRecord } from '@api/rest/rest.types';

import { NotionWord } from '@domain/rest/rest.models';

import { UNSPLASH_BASE_URL } from '@config/constants';

export const addImageUrlForEachNotionWordTransformator = (
  randomNotionWords: NotionWordResponseRecord[],
): NotionWord[] =>
  randomNotionWords.map((_notionWord) => {
    const wordToSearch = _notionWord.word.replace(/ /g, '+');
    const imageUrl = `${UNSPLASH_BASE_URL}${wordToSearch}`;

    return {
      imageUrl,
      ..._notionWord,
    };
  });
