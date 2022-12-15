import { functionImportTest } from '@infrastructure';

import { decrypt } from './decrypt.function';

describe('decrypt function', () => {
  functionImportTest(decrypt);

  it('should decrypt provided hash value', () => {
    const hash = {
      content: 'a5c99b73a57c4a1dfd0d8e',
      iv: '424488d2e4e2d125cbf5970684a9d765',
    };

    const result = decrypt(hash);

    expect(result).toEqual('test string');
  });
});
