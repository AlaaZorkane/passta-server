/**
 * https://github.com/generalpiston/typeorm-encrypted/blob/master/src/crypto.ts
 */
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export interface EncryptionOptions {
  key: string;
  algorithm: string;
  ivLength: number;
  iv?: string;
  looseMatching?: boolean;
}

/**
 * Encrypt data.
 */
export function encryptData(data: Buffer, options: EncryptionOptions): Buffer {
  const iv = options.iv ? Buffer.from(options.iv, "hex") : randomBytes(options.ivLength);
  const cipher = createCipheriv(options.algorithm, Buffer.from(options.key, "hex"), iv);
  const start = cipher.update(data);
  const final = cipher.final();
  return Buffer.concat([iv, start, final]);
}

/**
 * Decrypt data.
 */
export function decryptData(data: Buffer, options: EncryptionOptions): Buffer {
  const iv = data.slice(0, options.ivLength);
  const decipher = createDecipheriv(options.algorithm, Buffer.from(options.key, "hex"), iv);
  const start = decipher.update(data.slice(options.ivLength));
  const final = decipher.final();
  return Buffer.concat([start, final]);
}
