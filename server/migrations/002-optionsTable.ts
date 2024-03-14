import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE options (
      id  INTEGER PRIMARY key generated always AS identity,
      is_published BOOLEAN DEFAULT TRUE NOT NULL,
      name VARCHAR(50) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      currency CHAR(3) NOT NULL,
      description VARCHAR(1000) NOT NULL,
      listing_id INTEGER NOT NULL REFERENCES listings (id) ON DELETE cascade
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE options`;
}
