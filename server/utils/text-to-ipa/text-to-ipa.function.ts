import TextToIPA from 'text-to-ipa';

import { cleanUpString } from '@shared/functions';
import { isString } from '@shared/guards';

const pickFirstWordFromOr = (word: string | null) => {
  if (!isString(word)) {
    return null;
  }

  const words = word.split(' or ');

  return words[0];
};

const singleWordToIpa = (word: string | null) => {
  if (!isString(word)) {
    return null;
  }

  const lowerCasedWord = word.toLowerCase();
  const response = TextToIPA.lookup(lowerCasedWord);

  if (!response || response.error === 'undefined') {
    return null;
  }

  if (response.error === 'multi') {
    const { text } = response;

    return text ? text.toLowerCase() : null;
  }

  return response.text;
};

export const textToIpa = (word: string | null) => {
  if (!isString(word)) {
    return null;
  }

  const cleanedString = cleanUpString(word);
  const words = cleanedString.split(' ');

  if (words.length === 1) {
    return singleWordToIpa(cleanedString);
  }

  const canParseAllWords = words.every((_word) => singleWordToIpa(_word) !== null);

  return canParseAllWords
    ? words
        .map((_word) => {
          const parsedWord = singleWordToIpa(_word);

          return pickFirstWordFromOr(parsedWord);
        })
        .join(' ')
    : null;
};
