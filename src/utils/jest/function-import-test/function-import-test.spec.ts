import { functionImportTest } from './function-import-test.function';

describe('functionImportTest function', () => {
  it('should import', () => {
    expect(typeof functionImportTest).toBe('function');
  });

  functionImportTest(functionImportTest);
});
