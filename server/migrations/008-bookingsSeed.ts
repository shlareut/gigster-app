import { Sql } from 'postgres';

const seedBookings = [
  {
    id: 1,
    status: 'PENDING',
    user_id: 1,
    option_id: 2,
  },
  {
    id: 2,
    status: 'PENDING',
    user_id: 1,
    option_id: 3,
  },
  {
    id: 3,
    status: 'PENDING',
    user_id: 1,
    option_id: 1,
  },
];

export async function up(sql: Sql) {
  for (const item of seedBookings) {
    await sql`
      INSERT INTO
        bookings (
          status,
          user_id,
          option_id
        )
      VALUES
        (
          ${item.status},
          ${item.user_id},
          ${item.option_id}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const item of seedBookings) {
    await sql`
      DELETE FROM bookings
      WHERE
        id = ${item.id}
    `;
  }
}
