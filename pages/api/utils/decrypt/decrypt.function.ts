import crypto from 'node:crypto';

import { IHash } from './decrypt.type';

const algorithm = process.env.CRYPTO_ALGORITHM;
const secretKey = process.env.CRYPTO_SECRET_KEY;

export const decrypt = (hash: IHash) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};
