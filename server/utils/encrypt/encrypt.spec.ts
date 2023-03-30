import { functionImportTest } from '@infrastructure/functions';

import { encrypt } from './encrypt.function';

describe('encrypt function', () => {
  functionImportTest(encrypt);

  it('should encrypt passed string value', () => {
    const hash = encrypt('test string');

    expect(hash).toHaveProperty('iv');
    expect(hash).toHaveProperty('content');
  });
});
