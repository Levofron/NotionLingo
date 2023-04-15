import { isString } from '@shared/guards';

import { capitalizeFirstLetter } from '../capitalize-first-letter/capitalize-first-letter.function';
import { Options } from './clean-up-string.types';

const defaultOptions: Required<Options> = {
  shouldCapitalizeFirstLetter: true,
  toReturnWhenEmpty: '',
};

export const cleanUpString = (string: unknown, options: Options = defaultOptions): string => {
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
