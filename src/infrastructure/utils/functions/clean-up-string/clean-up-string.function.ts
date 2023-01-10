import { capitalizeFirstLetter, isString } from '@infrastructure/utils';

export const cleanUpString = (string: unknown, toReturnWhenEmpty: string = ''): string => {
  if (!isString(string)) {
    return toReturnWhenEmpty;
  }

  const trimmedString = string.trim();

  if (trimmedString.length === 0) {
    return toReturnWhenEmpty;
  }

  const stringAsLowerCase = trimmedString.toLowerCase();
  const stringWithoutMultipleSpaces = stringAsLowerCase.replaceAll(/\s+/g, ' ');
  const stringWithoutWhitespaces = stringWithoutMultipleSpaces.replaceAll(/[\t\n\r]/g, ' ');

  return capitalizeFirstLetter(stringWithoutWhitespaces);
};
