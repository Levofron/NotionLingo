import crypto from 'node:crypto';

import { CRYPTO_ALGORITHM, CRYPTO_SECRET_KEY } from '@config/constants';

import { IHash } from './decrypt.type';

export const decrypt = (hash: IHash) => {
  const decipher = crypto.createDecipheriv(
    CRYPTO_ALGORITHM,
    CRYPTO_SECRET_KEY,
    Buffer.from(hash.iv, 'hex'),
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};
