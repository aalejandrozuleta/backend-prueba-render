import crypto from 'crypto';

export function generateTempCode() {
  const code = crypto.randomBytes(3).toString('hex');
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + 300); // 5 minutos después

  return { code, expiration };
}