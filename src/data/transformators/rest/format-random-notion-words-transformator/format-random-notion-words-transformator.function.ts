import { INotionWord } from '@domain/rest/rest.models';

import { capitalizeFirstLetter, isString, objectKeys } from '@infrastructure/utils';

const EMPTY_FIELD_VALUE = '---';

const cleanUpString = (string: unknown): string => {
  if (!isString(string)) {
    return EMPTY_FIELD_VALUE;
  }

  const trimmedString = string.trim();

  if (trimmedString.length === 0) {
    return EMPTY_FIELD_VALUE;
  }

  const stringAsLowerCase = trimmedString.toLowerCase();
  const stringWithoutMultipleSpaces = stringAsLowerCase.replaceAll(/\s+/g, ' ');
  const stringWithoutWhitespaces = stringWithoutMultipleSpaces.replaceAll(/[\t\n\r]/g, ' ');

  return capitalizeFirstLetter(stringWithoutWhitespaces);
};

export const formatRandomNotionWordsTransformator = (
  randomNotionWords: INotionWord[],
): INotionWord[] =>
  randomNotionWords.map((_randomNotionWord) => {
    const randomNotionWord = { ..._randomNotionWord };

    for (const key of objectKeys(randomNotionWord)) {
      randomNotionWord[key] = cleanUpString(randomNotionWord[key]);
    }

    return randomNotionWord;
  });
