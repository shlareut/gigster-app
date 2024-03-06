import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// Create single user.
export async function createUser(username, password_hash) {
  const user = await sql`
    INSERT INTO
      users (username, password_hash)
    VALUES
      (
        ${username},
        ${password_hash}
      )
    RETURNING
      id,
      username
  `;
  return user;
}

// Read single user.
export async function getSingleUserByUsername(username) {
  const user = await sql`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
}

// Update single user password.
export async function updateUserPassword(username, password_hash) {
  const updatedUser = await sql`
    UPDATE users
    SET
      password_hash = ${password_hash}
    WHERE
      username = ${username}
    RETURNING
      id,
      username;
  `;
  return updatedUser[0];
}

// Update single user last login timestamp.
export async function updateUserLastLogin(username) {
  const updatedUser = await sql`
    UPDATE users
    SET
      last_login = CURRENT_TIMESTAMP
    WHERE
      username = ${username}
    RETURNING
      id,
      username;
  `;
  return updatedUser[0];
}
