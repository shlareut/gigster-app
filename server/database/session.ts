import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// create session
export async function createSession(user_id: number, token: string) {
  const session = await sql`
    INSERT INTO
      sessions (user_id, token)
    VALUES
      (
        ${user_id},
        ${token}
      )
    RETURNING
      sessions.id,
      sessions.token,
      sessions.user_id
  `;
  return session;
}
