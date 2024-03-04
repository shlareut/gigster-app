import { Sql } from 'postgres';

const seedUsers = [
  { username: '+4312345', password_hash: '12345' },
  { username: '+6583757414', password_hash: '12345' },
];

export async function up(sql: Sql) {
  for (const item of seedUsers) {
    await sql`
      INSERT INTO
        users (username, password_hash)
      VALUES
        (
          ${item.username},
          ${item.password_hash}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const item of seedUsers) {
    await sql`
      DELETE FROM users
      WHERE
        username = ${item.username}
    `;
  }
}
