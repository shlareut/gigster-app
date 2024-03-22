import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// type definition
export type User = {
  username: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  avatar_image: string;
};

// create single user.
export async function createUser(
  username: string,
  password_hash: string,
  first_name: string,
  last_name: string,
): Promise<User | null> {
  const [user] = await sql<User[]>`
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
  return user || null;
}

// Query all users
export async function getAllUsers(): Promise<User[]> {
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
  `;
  return users;
}

// Read single user by username.
export async function getSingleUserByUsername(
  username: string,
): Promise<User | null> {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user || null;
}

// Read single user by id.
export async function getSingleUserById(id: number): Promise<User | null> {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user || null;
}

// Update single user password.
export async function updateUserPassword(
  username: string,
  password_hash: string,
): Promise<User | null> {
  const [updatedUser] = await sql<User[]>`
    UPDATE users
    SET
      password_hash = ${password_hash}
    WHERE
      username = ${username}
    RETURNING
      id,
      username;
  `;
  return updatedUser || null;
}

// Update single user last login timestamp.
export async function updateUserLastLogin(
  username: string,
): Promise<User | null> {
  const [updatedUser] = await sql<User[]>`
    UPDATE users
    SET
      last_login = CURRENT_TIMESTAMP
    WHERE
      username = ${username}
    RETURNING
      id,
      username;
  `;
  return updatedUser || null;
}

// query user avatar by user id
export async function getUserAvatarByUserId(id: number): Promise<User | null> {
  const [user] = await sql<User[]>`
    SELECT
      avatar_image
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user || null;
}

// update user avatar
export async function updateUserAvatar(
  id: number,
  avatar_url: string,
): Promise<User | null> {
  const [updatedUser] = await sql<User[]>`
    UPDATE users
    SET
      avatar_image = ${avatar_url}
    WHERE
      id = ${id}
    RETURNING
      id,
      avatar_image;
  `;
  return updatedUser || null;
}
