import { functionImportTest } from '@shared/functions';

import { shuffleArray } from './shuffle-array.function';

describe('shuffleArray function', () => {
  functionImportTest(shuffleArray);

  describe('should return passed array scenario', () => {
    it('has only one element', () => {
      const array = [1];

      expect(shuffleArray(array)).toEqual(array);
    });

    it('has zero elements', () => {
      const array: number[] = [];

      expect(shuffleArray(array)).toEqual(array);
    });
  });

  describe('should return shuffled array scenario', () => {
    it('is going to be shuffled', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      expect(shuffleArray(array)).not.toEqual(array);
    });
  });
});
