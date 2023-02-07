import { cleanUpString, isString, objectKeys } from '@infrastructure/utils';

import { INotionWordResponseItem } from '../../../responses.types';

const EMPTY_FIELD_VALUE = '---';

export const formatRandomNotionWordsTransformator = (
  randomNotionWords: INotionWordResponseItem[],
): INotionWordResponseItem[] =>
  randomNotionWords.map((_randomNotionWord) => {
    const randomNotionWord = { ..._randomNotionWord };

    for (const _key of objectKeys(randomNotionWord)) {
      const currentValue = randomNotionWord[_key];

      if (_key === 'ipa') {
        continue;
      }

      if (!currentValue) {
        randomNotionWord[_key] = EMPTY_FIELD_VALUE;

        continue;
      }

      if (_key === 'type') {
        if (isString(currentValue)) {
          randomNotionWord[_key] = cleanUpString(currentValue);

          continue;
        }

        randomNotionWord[_key] = currentValue.map((_value) => cleanUpString(_value));

        continue;
      }

      randomNotionWord[_key] = cleanUpString(currentValue);
    }

    return randomNotionWord;
  });
