import { createHmac } from 'crypto';

export function encryptedSHA256Hash(
  value: string,
  originalValue: string,
): string {
  return createHmac('sha256', originalValue).update(value).digest('hex');
}
