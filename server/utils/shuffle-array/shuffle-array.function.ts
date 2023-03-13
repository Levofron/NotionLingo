import { getRandomNumber } from '..';

export const shuffleArray = <T>(array: T[]) => {
  const copiedArray = [...array];

  for (let i = copiedArray.length - 1; i > 0; i -= 1) {
    const j = getRandomNumber(0, i + 1);
    const temp = copiedArray[i];

    copiedArray[i] = copiedArray[j];
    copiedArray[j] = temp;
  }

  return copiedArray;
};
