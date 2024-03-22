import { Sql } from 'postgres';

const seedUsers = [
  {
    username: '+4312345',
    password_hash: '12345',
    first_name: 'Donald',
    last_name: 'Duck',
    avatar_image:
      'https://res.cloudinary.com/dpa9tzkwg/image/upload/v1711098131/user_avatars/xvn4rckowmbjyzd1ogoa.jpg',
  },
  {
    username: '+6583757414',
    password_hash: '12345',
    first_name: 'Mickey',
    last_name: 'Mouse',
    avatar_image:
      'https://res.cloudinary.com/dpa9tzkwg/image/upload/v1711098132/user_avatars/wvj7i7thhtdnfi1lolcu.jpg',
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
          last_name,
          avatar_image
        )
      VALUES
        (
          ${item.username},
          ${item.password_hash},
          ${item.first_name},
          ${item.last_name},
          ${item.avatar_image}
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
