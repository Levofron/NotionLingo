import { INotionWord } from '@domain/rest/rest.models';

import { cleanUpString, objectKeys } from '@infrastructure/utils';

const EMPTY_FIELD_VALUE = '---';

export const formatRandomNotionWordsTransformator = (
  randomNotionWords: INotionWord[],
): INotionWord[] =>
  randomNotionWords.map((_randomNotionWord) => {
    const randomNotionWord = { ..._randomNotionWord };

    for (const key of objectKeys(randomNotionWord)) {
      randomNotionWord[key] = cleanUpString(randomNotionWord[key], EMPTY_FIELD_VALUE);
    }

    return randomNotionWord;
  });
