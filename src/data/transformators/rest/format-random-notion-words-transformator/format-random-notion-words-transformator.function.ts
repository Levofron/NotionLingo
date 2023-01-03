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

  let stringAsLowerCase = trimmedString.toLowerCase();

  // Replace all whitespace characters with a single space
  stringAsLowerCase = stringAsLowerCase.replaceAll(/\s+/g, ' ');

  // Replace all new lines, tabs, and other white space characters
  stringAsLowerCase = stringAsLowerCase.replaceAll(/[\t\n\r]/g, ' ');

  return capitalizeFirstLetter(stringAsLowerCase);
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
