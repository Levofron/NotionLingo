import { NotionWordResponseRecord } from '@api/rest/rest.types';

import { cleanUpString } from '@shared/functions';
import { isString, objectKeys } from '@shared/guards';

const cleanUpStringOptions = {
  toReturnWhenEmpty: '---',
};

export const formatRandomNotionWordsTransformator = (
  randomNotionWords: NotionWordResponseRecord[],
): NotionWordResponseRecord[] =>
  randomNotionWords.map((_randomNotionWord) => {
    const randomNotionWord = { ..._randomNotionWord };

    for (const _key of objectKeys(randomNotionWord)) {
      const isTypeColumn = _key === 'type';
      const currentValue = randomNotionWord[_key];

      if (['ipa', 'id'].includes(_key)) {
        continue;
      }

      if (!currentValue) {
        randomNotionWord[_key] = isTypeColumn ? '' : cleanUpStringOptions.toReturnWhenEmpty;

        continue;
      }

      if (_key === 'type') {
        if (isString(currentValue)) {
          randomNotionWord[_key] = cleanUpString(currentValue, cleanUpStringOptions);

          continue;
        }

        randomNotionWord[_key] = currentValue.map((_value) =>
          cleanUpString(_value, cleanUpStringOptions),
        );

        continue;
      }

      randomNotionWord[_key] = cleanUpString(currentValue, cleanUpStringOptions);
    }

    return randomNotionWord;
  });
