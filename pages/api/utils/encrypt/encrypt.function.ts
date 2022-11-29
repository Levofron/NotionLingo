import crypto from 'node:crypto';

const algorithm = process.env.CRYPTO_ALGORITHM;
const secretKey = process.env.CRYPTO_SECRET_KEY;

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};
