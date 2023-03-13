import crypto from 'node:crypto';

import { CRYPTO_ALGORITHM, CRYPTO_SECRET_KEY } from '@config/constants';

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(CRYPTO_ALGORITHM, CRYPTO_SECRET_KEY, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};
