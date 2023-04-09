import { isString } from '@infrastructure/guards';

import { capitalizeFirstLetter } from '../capitalize-first-letter/capitalize-first-letter.function';
import { IOptions } from './clean-up-string.types';

const defaultOptions: Required<IOptions> = {
  shouldCapitalizeFirstLetter: true,
  toReturnWhenEmpty: '',
};

export const cleanUpString = (string: unknown, options: IOptions = defaultOptions): string => {
  const {
    shouldCapitalizeFirstLetter = defaultOptions.shouldCapitalizeFirstLetter,
    toReturnWhenEmpty = defaultOptions.toReturnWhenEmpty,
  } = options;

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
  const stringWithoutFirstAndLastColon = stringWithoutWhitespaces.replaceAll(/^:|:$/g, '').trim();

  return shouldCapitalizeFirstLetter
    ? capitalizeFirstLetter(stringWithoutFirstAndLastColon)
    : stringWithoutFirstAndLastColon;
};
