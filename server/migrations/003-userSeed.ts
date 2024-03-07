import { Sql } from 'postgres';

const seedUsers = [
  {
    username: '+4312345',
    password_hash: '12345',
    first_name: 'Donald',
    last_name: 'Duck',
  },
  {
    username: '+6583757414',
    password_hash: '12345',
    first_name: 'Mickey',
    last_name: 'Mouse',
  },
];

export async function up(sql: Sql) {
  for (const item of seedUsers) {
    await sql`
      INSERT INTO
        users (
          username,
          password_hash,
          first_name,
          last_name
        )
      VALUES
        (
          ${item.username},
          ${item.password_hash},
          ${item.first_name},
          ${item.last_name}
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
