import { isFunction } from '@shared/guards';

export function functionImportTest(func: Function): void {
  if (!isFunction(func)) {
    throw new Error('parameter is not a function');
  }

  describe('import test', () => {
    it(`should import ${func.name}`, () => {
      expect(typeof func).toBe('function');
    });
  });
}
