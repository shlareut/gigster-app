import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE public_transport_locations (
      id  INTEGER PRIMARY key generated always AS identity,
      lat FLOAT NOT NULL,
      long FLOAT NOT NULL,
      station_city VARCHAR(50) NOT NULL,
      station_name VARCHAR(50) NOT NULL,
      station_type VARCHAR(50) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE public_transport_locations`;
}
