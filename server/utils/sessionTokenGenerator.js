import crypto from 'node:crypto';

export default function generateSessionToken() {
  return crypto.randomBytes(100).toString('base64');
}
