import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// Create single user.
export async function createUser(
  username: string,
  password_hash: string,
  first_name: string,
  last_name: string,
) {
  const user = await sql`
    INSERT INTO
      users (
        username,
        password_hash,
        first_name,
        last_name
      )
    VALUES
      (
        ${username},
        ${password_hash},
        ${first_name},
        ${last_name}
      )
    RETURNING
      id,
      username
  `;
  return user;
}

// Read single user.
export async function getSingleUserByUsername(username: string) {
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
export async function updateUserPassword(
  username: string,
  password_hash: string,
) {
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
export async function updateUserLastLogin(username: string) {
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
