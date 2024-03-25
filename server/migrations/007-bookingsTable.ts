import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE bookings (
      id  INTEGER PRIMARY key generated always AS identity,
      status varchar(50) NOT NULL DEFAULT 'IN_REVIEW',
      experience INTEGER NOT NULL,
      remarks varchar(1000) NOT NULL,
      user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE cascade,
      option_id INTEGER NOT NULL REFERENCES options (id) ON DELETE cascade,
      booking_timestamp timestamp NOT NULL DEFAULT now(),
      last_update_timestamp timestamp DEFAULT now()
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE bookings`;
}
