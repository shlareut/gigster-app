import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// get all sessions
export async function getAllSessions() {
  const sessions = await sql`
    SELECT
      *
    FROM
      sessions
  `;
  return sessions;
}

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

// get session by session token
export async function getSession(token: string) {
  const session = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token}
    LIMIT
      1
  `;
  return session;
}

// delete session
export const deleteSession = async (token: string) => {
  const session = await sql`
    DELETE FROM sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      sessions.id,
      sessions.token
  `;
  return session;
};
