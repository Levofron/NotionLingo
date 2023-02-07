import { cleanUpString, isString, objectKeys } from '@infrastructure/utils';

import { INotionWordResponseItem } from '../../../responses.types';

const cleanUpStringOptions = {
  toReturnWhenEmpty: '---',
};

export const formatRandomNotionWordsTransformator = (
  randomNotionWords: INotionWordResponseItem[],
): INotionWordResponseItem[] =>
  randomNotionWords.map((_randomNotionWord) => {
    const randomNotionWord = { ..._randomNotionWord };

    for (const _key of objectKeys(randomNotionWord)) {
      const currentValue = randomNotionWord[_key];

      if (['ipa', 'id'].includes(_key)) {
        continue;
      }

      if (!currentValue) {
        randomNotionWord[_key] = cleanUpStringOptions.toReturnWhenEmpty;

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
