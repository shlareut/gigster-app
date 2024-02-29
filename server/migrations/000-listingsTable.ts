import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE listings (
      id integer PRIMARY key generated always AS identity,
      is_published varchar(50) DEFAULT TRUE NOT NULL,
      name varchar(50) NOT NULL,
      type varchar(50) NOT NULL,
      address_line_one varchar(50) NOT NULL,
      address_line_two varchar(50),
      postal_code varchar(20) NOT NULL,
      city varchar(50) NOT NULL,
      city_district varchar(50) NOT NULL,
      country varchar(50) NOT NULL,
      description varchar(1000) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE listings`;
}
