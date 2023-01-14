import { INotionWord } from '@domain/rest/rest.models';

import { cleanUpString, isString, objectKeys } from '@infrastructure/utils';

const EMPTY_FIELD_VALUE = '---';

export const formatRandomNotionWordsTransformator = (
  randomNotionWords: INotionWord[],
): INotionWord[] =>
  randomNotionWords.map((_randomNotionWord) => {
    const randomNotionWord = { ..._randomNotionWord };

    for (const _key of objectKeys(randomNotionWord)) {
      const currentValue = randomNotionWord[_key];

      if (!currentValue) {
        randomNotionWord[_key] = EMPTY_FIELD_VALUE;

        // eslint-disable-next-line no-continue
        continue;
      }

      if (_key === 'type') {
        if (isString(currentValue)) {
          randomNotionWord[_key] = cleanUpString(currentValue, EMPTY_FIELD_VALUE);

          // eslint-disable-next-line no-continue
          continue;
        }

        randomNotionWord[_key] = currentValue.map((_value) =>
          cleanUpString(_value, EMPTY_FIELD_VALUE),
        );

        // eslint-disable-next-line no-continue
        continue;
      }

      randomNotionWord[_key] = cleanUpString(currentValue, EMPTY_FIELD_VALUE);
    }

    return randomNotionWord;
  });
